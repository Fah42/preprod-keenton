import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Collection blog : schema aligne sur le frontmatter defini dans CLAUDE.md
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Keenton'),
    category: z.string(),
    expertise: z.enum([
      'informatique-entreprise',
      'hebergement-cloud',
      'infogerance',
      'cybersecurite',
      'devops',
      'automatisation-ia',
      'microsoft-365',
    ]),
    tags: z.array(z.string()).default([]),
    // Illustration de couverture (chemin public, ex. /images/blog/slug.svg)
    // et son texte alternatif. Optionnels : sans image, les gabarits gardent
    // leur placeholder "Illustration a venir".
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    readTime: z.number().int().positive().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Collection services : donnees structurees des 7 pages categorie (JSON),
// rendues par la route dynamique src/pages/expertises/[slug].astro. Un futur
// CMS pourra editer ces fichiers sans toucher aux composants.
//
// Squelette valide par Jeremy : hero avec illustration + N sections alternees
// visuel/texte (CategoryHero + AlternatingFeature). Une section peut fournir
// une image reelle ; sans image, le gabarit conserve PlaceholderVisual.
//
// Pas de `title` ni `accentColor` ici : ces deux champs existent deja dans
// `expertises` (src/data/site.js), source unique de verite pour tout ce qui
// touche identite/couleur/nav -- les dupliquer ici forcait a editer 8
// fichiers a chaque changement de palette. [slug].astro les recupere via
// `expertises.find(e => e.slug === entry.id)`.
const cta = z.object({ label: z.string(), href: z.string() });
const contentColumn = z.object({ title: z.string(), items: z.array(z.string()) });
const conceptDetail = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  eyebrow: z.string(),
  title: z.string(),
  introduction: z.string(),
  flow: z.array(z.string()).length(3),
  sections: z.array(z.object({ title: z.string(), text: z.string() })),
  checkpoints: z.array(z.string()),
  callout: z.string(),
});
const compactConceptDetail = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  eyebrow: z.string(),
  title: z.string(),
  introduction: z.string(),
  facts: z.array(z.object({ label: z.string(), value: z.string() })).length(3),
});
const serviceItem = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  text: z.string(),
  icon: z.string().optional(),
  help: z.string().optional(),
  detail: conceptDetail.optional(),
  compactDetail: compactConceptDetail.optional(),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/services' }),
  schema: z.object({
    description: z.string(),
    hero: z.object({
      eyebrow: z.string(),
      title: z.string(),
      titleAccent: z.string(),
      subtitle: z.string(),
      image: z.object({ src: z.string(), alt: z.string() }).optional(),
      primaryCta: cta,
      secondaryCta: cta,
    }),
    sections: z.array(
      z.object({
        title: z.string(),
        body: z.string(),
        icon: z.string().optional(),
        image: z.object({ src: z.string(), alt: z.string() }).optional(),
        type: z.enum(['split', 'capabilities', 'process', 'decision', 'spotlight', 'checklist', 'mosaic']).default('split'),
        eyebrow: z.string().optional(),
        items: z.array(serviceItem).default([]),
        cta: cta.optional(),
        variant: z.enum(['simple', 'list', 'tiles', 'callout', 'metrics', 'steps', 'comparison', 'quote']).optional(),
        points: z.array(z.string()).optional(),
        stats: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
        columns: z.array(contentColumn).optional(),
        layout: z.enum(['four', 'six']).optional(),
      })
    ),
  }),
});

export const collections = { blog, services };
