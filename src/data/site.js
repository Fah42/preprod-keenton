// Donnees globales du site : identite, navigation, expertises.
// Separe de la presentation pour permettre une edition CMS future.
//
// `expertises` est la source unique de verite : le menu deroulant, le footer,
// la grille de la page d'accueil ("Nos piliers d'expertise"), l'etape 1 du
// configurateur (/configurateur) et la route /expertises/[slug] en derivent
// tous. `accentColor` est la teinte propre a chaque categorie (palette
// officielle KEENTON validee par Jeremy le 2026-07-09, cf. CLAUDE.md) --
// chaque categorie a sa propre teinte, DIFFERENTE du bleu de marque
// #29aae3. Le chrome global du site (header/footer/CTA) reste toujours sur
// le bleu de marque unique #29aae3, seule la page de chaque categorie
// utilise sa propre teinte via la CSS custom property --cat-accent, et le
// menu deroulant au survol via --item-accent. `shortLabel` est le diminutif
// utilise par les boutons de filtre du blog (/blog).

export const site = {
  name: 'Keenton',
  baseline: 'Services informatiques pour les entreprises',
  location: 'Pantin, Île-de-France',
  cta: {
    label: 'Parler de votre projet',
    href: '/contact',
  },
};

export const expertises = [
  {
    slug: 'informatique-entreprise',
    shortLabel: 'Informatique',
    title: "Informatique d'entreprise",
    short: 'Réseau, téléphonie et postes de travail',
    icon: 'wifi',
    accentColor: '#388E3C',
    points: [
      'Connectivité Internet',
      "Réseaux d'entreprise",
      'Wi-Fi professionnel',
      'Téléphonie & Communications unifiées',
      'Serveurs & Virtualisation',
      'Stockage & Partage de fichiers',
      "Contrôle d'accès & Vidéosurveillance",
    ],
    href: '/expertises/informatique-entreprise',
  },
  {
    slug: 'hebergement-cloud',
    shortLabel: 'Cloud',
    title: 'Hébergement & Cloud',
    short: 'Infrastructures dimensionnées pour vos usages',
    icon: 'cloud',
    accentColor: '#1565C0',
    points: [
      'Cloud privé / Cloud public',
      'Instances / VPS / Machines virtuelles',
      'Hébergement Web',
      'Infrastructure sur mesure',
      'Sauvegarde externalisée & PRA',
      'Datacenter',
    ],
    href: '/expertises/hebergement-cloud',
  },
  {
    slug: 'infogerance',
    shortLabel: 'Infogérance',
    title: 'Infogérance',
    short: 'Exploitation déléguée, maîtrise conservée',
    icon: 'cog',
    accentColor: '#E6A700',
    points: [
      'Infogérance serveur',
      'Infogérance infrastructure',
      'Infogérance cloud public',
      'Infogérance poste de travail',
      'Support et maintenance',
    ],
    href: '/expertises/infogerance',
  },
  {
    slug: 'cybersecurite',
    shortLabel: 'Cybersécurité',
    title: 'Cybersécurité',
    short: 'Gouvernance, protection et sensibilisation',
    icon: 'shield-check',
    accentColor: '#DC2626',
    points: [
      'Gouvernance & conformité',
      'Évaluation des risques',
      'Conformité & réglementation',
      'Protection du système d’information',
      'Surveillance & maintien en condition de sécurité',
      'Sensibilisation',
    ],
    href: '/expertises/cybersecurite',
  },
  {
    slug: 'devops',
    shortLabel: 'DevOps',
    title: 'Plateformes DevOps',
    short: 'Des déploiements fiables et répétables',
    icon: 'infinity',
    accentColor: '#B87333',
    points: [
      'CI/CD & GitLab',
      'Kubernetes',
      'GitOps',
      'Infrastructure as Code',
      'Observabilité & Supervision',
    ],
    href: '/expertises/devops',
  },
  {
    slug: 'automatisation-ia',
    shortLabel: 'IA',
    title: 'Automatisation & IA',
    short: 'Des outils connectés à vos données',
    icon: 'brain',
    accentColor: '#6F2DBD',
    points: [
      "Intégration d'applications & APIs",
      'Workflows & automatisation métier',
      'Agents IA',
      'RAG',
      'Applications métier',
      "Intégration de l'IA dans les processus métier",
    ],
    href: '/expertises/automatisation-ia',
  },
  {
    slug: 'microsoft-365',
    shortLabel: 'M365',
    title: 'Microsoft 365',
    short: 'Messagerie, Teams et postes managés',
    icon: 'mail',
    accentColor: '#00A4EF',
    points: [
      'Messagerie & Archivage',
      'Microsoft Teams & Teams Phone',
      'SharePoint & OneDrive',
      'Microsoft Intune',
      'Microsoft Entra ID',
    ],
    href: '/expertises/microsoft-365',
  },
];

export const mainNav = [
  { label: 'Accueil', href: '/' },
  {
    label: 'Expertises',
    href: '/expertises',
    children: expertises.map(({ title, short, href, accentColor }) => ({
      label: title,
      short,
      href,
      accentColor,
    })),
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Recrutement', href: '/recrutement' },
  { label: 'Contact', href: '/contact' },
];
