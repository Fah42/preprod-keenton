#!/usr/bin/env ruby

require 'date'
require 'fileutils'
require 'json'
require 'nokogiri'
require 'open3'
require 'pathname'
require 'tmpdir'
require 'uri'

ROOT = Pathname.new(__dir__).join('..').expand_path
SOURCE_MEDIA = ROOT.join('illustration-ancien-blog')
TARGET_MEDIA = ROOT.join('public/images/blog/ancien-blog')
TARGET_POSTS = ROOT.join('src/content/blog')

POSTS = [
  ['comment-avoir-un-wifi-rapide-les-elements-cles-au-dela-des-bornes', 'informatique-entreprise'],
  ['heberger-repliquer-votre-stockage-synology-en-datacenter', 'hebergement-cloud'],
  ['keenton-et-le-defi-des-migrations-informatique', 'informatique-entreprise'],
  ['sauvegarde-3-2-1-discutons-securite-de-vos-donnees', 'hebergement-cloud'],
  ['telephonie-voip-microsoft-teams', 'microsoft-365'],
  ['archivmail-la-solution-darchivage-demail', 'microsoft-365'],
  ['ransomwares-limportance-des-couches-de-securite-en-entreprise', 'cybersecurite'],
  ['sauvegarde-cloud-synology', 'hebergement-cloud'],
  ['infogerance-poste-apple-mac', 'infogerance'],
  ['pretzi-la-solution-de-gestion-des-materiels-pedagogiques', 'informatique-entreprise'],
  ['keenton-specialiste-du-teletravail', 'informatique-entreprise'],
  ['supervision-sonicwall-email-security-avec-zabbix', 'cybersecurite'],
  ['sauvegarde-cloud-restauration-windows-en-bare-metal', 'hebergement-cloud'],
  ['sauvegarde-cloud-poste-serveur-windows', 'hebergement-cloud'],
  ['supervision-pfsense-avec-agent-zabbix-integre', 'cybersecurite'],
  ['lancement-du-blog-keenton', 'informatique-entreprise'],
].freeze

MONTHS = {
  'jan' => 1,
  'fev' => 2,
  'mar' => 3,
  'avr' => 4,
  'mai' => 5,
  'juin' => 6,
  'juil' => 7,
  'aou' => 8,
  'sep' => 9,
  'oct' => 10,
  'nov' => 11,
  'dec' => 12,
}.freeze

TAG_NAMES = {
  '3cx' => '3CX',
  'adobe' => 'Adobe',
  'antispam' => 'Antispam',
  'antivirus' => 'Antivirus',
  'apple' => 'Apple',
  'autocad' => 'AutoCAD',
  'email' => 'E-mail',
  'firewall' => 'Firewall',
  'keenton' => 'Keenton',
  'mac' => 'Mac',
  'microsoft-office' => 'Microsoft Office',
  'microsoft-office-365' => 'Microsoft 365',
  'microsoft-teams' => 'Microsoft Teams',
  'nas' => 'NAS',
  'office-365' => 'Microsoft 365',
  'pfsense' => 'pfSense',
  'ransomware' => 'Ransomware',
  'rgpd' => 'RGPD',
  'sonicwall-email-security' => 'SonicWall Email Security',
  'synology' => 'Synology',
  'telephonie-voip' => 'Téléphonie VoIP',
  'teletravail' => 'Télétravail',
  'vpn' => 'VPN',
  'wi-fi' => 'Wi-Fi',
  'wifi' => 'Wi-Fi',
  'windows' => 'Windows',
  'zabbix' => 'Zabbix',
}.freeze

PREFERRED_COVERS = {
  'sauvegarde-3-2-1-discutons-securite-de-vos-donnees' => 'keenton_sauvegarde_3-2-1-1.jpg',
}.freeze

def ascii_slug(value)
  value
    .unicode_normalize(:nfkd)
    .encode('ASCII', invalid: :replace, undef: :replace, replace: '')
    .downcase
    .gsub(/[^a-z0-9.]+/, '-')
    .gsub(/-+/, '-')
    .gsub(/\A-|-\z/, '')
end

def safe_media_name(filename)
  extension = File.extname(filename).downcase
  stem = File.basename(filename, File.extname(filename))
  "#{ascii_slug(stem)}#{extension}"
end

def html_text(node)
  node&.text.to_s.gsub(/\s+/, ' ').strip
end

def parse_french_date(value)
  normalized = value
    .unicode_normalize(:nfkd)
    .encode('ASCII', invalid: :replace, undef: :replace, replace: '')
    .downcase
    .gsub(',', ' ')
    .split

  day = normalized[0].to_i
  month_key = normalized[1].to_s[0, 4]
  month = MONTHS.find { |key, _| month_key.start_with?(key) }&.last
  year = normalized[2].to_i
  raise "Date française non reconnue : #{value}" unless day.positive? && month && year.positive?

  Date.new(year, month, day)
end

def display_tag(slug)
  TAG_NAMES.fetch(slug) do
    slug.split('-').map(&:capitalize).join(' ')
  end
end

def fetch_html(url)
  stdout, stderr, status = Open3.capture3(
    'curl',
    '-fsSL',
    '-A',
    'Mozilla/5.0',
    url,
  )
  raise "Téléchargement impossible pour #{url}: #{stderr.strip}" unless status.success?

  stdout
end

def download_remote_media(url, target_directory, media_by_original, media_by_normalized)
  uri = URI.parse(url)
  return nil unless uri.host == 'www.keenton.com' && uri.path.start_with?('/wp-content/uploads/')

  basename = File.basename(URI.decode_www_form_component(uri.path))
  target_name = safe_media_name(basename)
  target = target_directory.join(target_name)

  unless target.exist?
    _stdout, stderr, status = Open3.capture3(
      'curl',
      '-fsSL',
      '-A',
      'Mozilla/5.0',
      '-o',
      target.to_s,
      url,
    )
    return nil unless status.success?
  end

  public_path = "/images/blog/ancien-blog/#{target_name}"
  media_by_original[basename.downcase] = public_path
  media_by_normalized[ascii_slug(basename)] = public_path
  public_path
rescue URI::InvalidURIError
  nil
end

def convert_div_tables(content)
  content.css('div[role="table"]').each do |source_table|
    rows = source_table
      .css('[role="row"]')
      .reject { |row| row['aria-hidden'] == 'true' }
      .each_with_object({}) do |row, indexed|
        row_index = row['aria-rowindex'].to_i
        indexed[row_index] ||= row
      end
      .sort_by(&:first)
      .map(&:last)

    next if rows.empty?

    table = Nokogiri::XML::Node.new('table', source_table.document)
    thead = Nokogiri::XML::Node.new('thead', source_table.document)
    tbody = Nokogiri::XML::Node.new('tbody', source_table.document)

    rows.each_with_index do |source_row, row_position|
      row = Nokogiri::XML::Node.new('tr', source_table.document)
      cells = source_row
        .xpath('./*[@role="cell" or @role="columnheader" or @role="rowheader"]')
        .sort_by { |cell| cell['aria-colindex'].to_i }

      cells.each do |source_cell|
        tag_name = row_position.zero? || source_cell['role'] == 'rowheader' ? 'th' : 'td'
        cell = Nokogiri::XML::Node.new(tag_name, source_table.document)
        data = source_cell.at_css('.dvmd_tm_cdata') || source_cell
        cell.inner_html = data.inner_html
        row.add_child(cell)
      end

      (row_position.zero? ? thead : tbody).add_child(row)
    end

    table.add_child(thead)
    table.add_child(tbody)
    source_table.replace(table)
  end
end

def convert_to_markdown(html)
  Dir.mktmpdir('keenton-legacy-blog') do |directory|
    input = File.join(directory, 'article.html')
    File.write(input, html)

    stdout, stderr, status = Open3.capture3(
      'pandoc',
      '--from=html',
      '--to=gfm',
      '--wrap=none',
      '--markdown-headings=atx',
      input,
    )
    raise "Pandoc n'a pas pu convertir l'article : #{stderr.strip}" unless status.success?

    stdout
  end
end

FileUtils.mkdir_p(TARGET_MEDIA)
FileUtils.mkdir_p(TARGET_POSTS)

media_by_original = {}
media_by_normalized = {}

SOURCE_MEDIA.children
  .select(&:file?)
  .select { |path| path.extname.match?(/\A\.(?:gif|jpe?g|png|svg|webp)\z/i) }
  .sort
  .each do |source|
    target_name = safe_media_name(source.basename.to_s)
    target = TARGET_MEDIA.join(target_name)

    if target.exist? && !FileUtils.compare_file(source, target)
      digest = source.basename.to_s.hash.abs.to_s(36)
      target_name = "#{File.basename(target_name, File.extname(target_name))}-#{digest}#{File.extname(target_name)}"
      target = TARGET_MEDIA.join(target_name)
    end

    FileUtils.cp(source, target)
    public_path = "/images/blog/ancien-blog/#{target_name}"
    media_by_original[source.basename.to_s.downcase] = public_path
    media_by_normalized[ascii_slug(source.basename.to_s)] = public_path
  end

def local_media_path(url, media_by_original, media_by_normalized)
  return nil if url.to_s.empty?

  decoded_path = URI.decode_www_form_component(URI.parse(url).path)
  basename = File.basename(decoded_path)
  direct = media_by_original[basename.downcase]
  return direct if direct

  normalized = ascii_slug(basename)
  found = media_by_normalized[normalized]
  return found if found

  without_size = basename.sub(/-\d+x\d+(?=\.[^.]+\z)/, '')
  media_by_original[without_size.downcase] || media_by_normalized[ascii_slug(without_size)]
rescue URI::InvalidURIError
  nil
end

article_routes = POSTS.to_h { |slug, _| ["https://www.keenton.com/#{slug}/", "/blog/#{slug}"] }
warnings = []

POSTS.each do |slug, expertise|
  legacy_url = "https://www.keenton.com/#{slug}/"
  document = Nokogiri::HTML5(fetch_html(legacy_url))
  article = document.at_css('article.type-post') || document.at_css('article')
  raise "Article introuvable dans #{legacy_url}" unless article

  title = html_text(article.at_css('h1.entry-title'))
  meta = article.at_css('.post-meta')
  author = html_text(meta&.at_css('.author'))
  author = 'Keenton' if author.empty?
  date = parse_french_date(html_text(meta&.at_css('.published')))

  categories = (meta ? meta.css('a[href*="/category/"]') : [])
    .map { |node| html_text(node) }
    .reject(&:empty?)
    .uniq

  tag_slugs = article['class']
    .to_s
    .split
    .grep(/\Atag-/)
    .map { |class_name| class_name.delete_prefix('tag-') }
  tags = (categories.drop(1) + tag_slugs.map { |tag| display_tag(tag) }).uniq

  description = document.at_css('meta[property="og:description"]')&.[]('content').to_s.strip
  content = article.at_css('.entry-content')
  raise "Contenu introuvable dans #{legacy_url}" unless content

  content = content.dup
  content.css('script, style, noscript, form, .et_pb_contact_form_container, .et_pb_comments_module, .et_pb_main_blurb_image').remove
  convert_div_tables(content)

  content.css('h1, h2, h3, h4').each do |heading|
    next unless html_text(heading).match?(/Contactez notre équipe afin d[’']évaluer vos besoins/i)

    section = heading.ancestors.find { |node| node['class'].to_s.split.include?('et_pb_section') }
    section ? section.remove : heading.remove
  end

  content.css('img').each do |image|
    source = image['src'].to_s
    local = local_media_path(source, media_by_original, media_by_normalized)
    local ||= download_remote_media(source, TARGET_MEDIA, media_by_original, media_by_normalized)
    if local
      image['src'] = local
    elsif source.include?('/wp-content/uploads/')
      warnings << "#{slug}: image locale introuvable pour #{File.basename(URI.parse(source).path)}"
    end
    image.remove_attribute('srcset')
    image.remove_attribute('sizes')
    image.remove_attribute('loading')
    image.remove_attribute('data-src')
    image.attribute_nodes.each do |attribute|
      image.remove_attribute(attribute.name) unless %w[src alt title width height].include?(attribute.name)
    end
  end

  content.css('a[href]').each do |link|
    href = link['href'].to_s
    mapped_route = article_routes[href]
    if mapped_route
      link['href'] = mapped_route
      next
    end

    local = local_media_path(href, media_by_original, media_by_normalized)
    local ||= download_remote_media(href, TARGET_MEDIA, media_by_original, media_by_normalized)
    link['href'] = local if local
    link.attribute_nodes.each do |attribute|
      link.remove_attribute(attribute.name) unless %w[href title].include?(attribute.name)
    end
  end

  content.css('div, span').reverse_each do |wrapper|
    next unless wrapper.parent

    wrapper.replace(wrapper.children)
  end

  markdown = convert_to_markdown(content.inner_html)
    .gsub(/[\uE000-\uF8FF]/, '')
    .gsub(/^\\\s*$/, '')
    .gsub(/``` EnlighterJSRAW/, '```text')
    .gsub(/^### \*\*([^*]+)\*\*([^ \n])/, '### \1 \2')
    .gsub(/[ \t]+\n/, "\n")
    .gsub(/\n{3,}/, "\n\n")
    .strip

  if description.empty?
    first_paragraph = content.at_css('p')
    description = html_text(first_paragraph)[0, 240]
  end

  cover_source = document.at_css('meta[property="og:image"]')&.[]('content')
  cover = local_media_path(PREFERRED_COVERS[slug], media_by_original, media_by_normalized)
  cover ||= local_media_path(cover_source, media_by_original, media_by_normalized)
  cover ||= download_remote_media(cover_source, TARGET_MEDIA, media_by_original, media_by_normalized)
  warnings << "#{slug}: illustration de couverture locale introuvable" if cover_source && !cover

  word_count = markdown.scan(/\p{L}[\p{L}\p{M}'’_-]*/).length
  read_time = [(word_count / 220.0).ceil, 1].max
  category = categories.first || 'Ancien blog'

  frontmatter = [
    '---',
    "title: #{JSON.generate(title)}",
    "description: #{JSON.generate(description)}",
    "date: #{JSON.generate(date.iso8601)}",
    "author: #{JSON.generate(author)}",
    "category: #{JSON.generate(category)}",
    "expertise: #{JSON.generate(expertise)}",
    "tags: #{JSON.generate(tags)}",
    ("image: #{JSON.generate(cover)}" if cover),
    ("imageAlt: #{JSON.generate(title)}" if cover),
    "readTime: #{read_time}",
    'featured: false',
    'draft: false',
    "legacyUrl: #{JSON.generate(legacy_url)}",
    '---',
  ].compact.join("\n")

  File.write(TARGET_POSTS.join("#{slug}.md"), "#{frontmatter}\n\n#{markdown}\n")
  puts "Importé : #{slug} → #{expertise}"
end

puts
puts "#{POSTS.length} articles importés."
puts "#{media_by_original.length} médias copiés dans #{TARGET_MEDIA.relative_path_from(ROOT)}."

unless warnings.empty?
  puts
  puts 'Points à contrôler :'
  warnings.uniq.each { |warning| puts "- #{warning}" }
end
