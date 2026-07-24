// Contenu editorial de la page d'accueil.
// Modifier les textes ici ne doit jamais necessiter de toucher aux composants.

// H1 de la page : porte le mot-cle principal "services informatiques pour
// entreprises" + "infogérance" en debut de titre, lisible par un humain.
export const hero = {
	title: "L'informatique d'entreprise,",
	titleAccent: "de la conception à l'infogérance.",
	image: {
		src: '/images/hero-home.png',
		alt: 'Les sept domaines d’expertise Keenton',
	},
  subtitle:
		"Nous accompagnons les entreprises dans la conception, le déploiement, la sécurisation et l'exploitation de leur système d'information. Notre objectif : vous offrir une infrastructure performante, pérenne et adaptée à vos enjeux.",
  primaryCta: { label: 'Parler de votre projet', href: '/contact' },
};

// En-tete de la section "Nos expertises" (H2 porteur pour le SEO).
export const expertisesSection = {
	eyebrow: 'Nos expertises',
	title: '7 expertises. Une vision. Un seul interlocuteur.',
	intro:
		"Multiplier les prestataires, c'est souvent multiplier les interlocuteurs, les délais et les zones grises. Nous faisons le choix inverse : réunir toutes les compétences au sein d'une seule équipe. Un interlocuteur unique pilote les expertises et garantit une vision cohérente de votre système d'information.",
};

export const reassurance = [
  {
    icon: 'award',
    title: 'SLA 99,99%, Passion 300%',
    metrics: { sla: 99.99, passion: 300 },
  },
  {
    icon: 'crown',
    title: 'Chez nous, le ROI porte la couronne',
    displayLines: ['Chez nous, le ROI', 'porte la couronne'],
  },
  {
    icon: 'infinity',
    title: 'Les technologies évoluent. La confiance reste.',
    displayLines: ['Les technologies évoluent.', 'La confiance reste.'],
  },
  {
    icon: 'clock',
    title: 'Uptime depuis le 26 octobre 2015. Toujours en production.',
    foundedAt: '2015-10-26T00:00:00Z',
  },
];

export const philosophy = {
  eyebrow: 'Notre philosophie',
  title: "Nous adaptons la technologie à votre entreprise, jamais l'inverse.",
  intro: "Les technologies évoluent sans cesse. Nos principes, eux, restent les mêmes : privilégier la simplicité, anticiper les évolutions, sécuriser dès la conception et toujours choisir la solution la plus adaptée à votre entreprise.",
  principles: [
    {
      title: 'La simplicité',
      text: "Une infrastructure simple est plus facile à comprendre, à maintenir et à faire évoluer. La simplicité n'est pas un compromis : c'est le résultat d'une architecture bien pensée.",
    },
    {
      title: 'La sécurité dès la conception',
      text: "Une infrastructure fiable commence par une architecture sécurisée. Nous intégrons les bonnes pratiques de cybersécurité dès la conception pour protéger durablement votre système d'information.",
    },
    {
      title: 'Construire pour durer',
      text: "Une infrastructure ne devrait pas être reconstruite tous les trois ans. Nous concevons des fondations solides, capables d'accompagner la croissance et les évolutions de votre entreprise.",
    },
    {
      title: 'La transparence',
      text: "Votre système d'information vous appartient. Documentation, accès, mots de passe et choix techniques : nous partageons tout pour que vous restiez pleinement maître de votre infrastructure.",
    },
    {
      title: 'Un partenariat durable',
      text: "Nous privilégions une relation de proximité, avec des échanges réguliers et une compréhension fine de votre activité. C'est cette connaissance qui nous permet de vous accompagner efficacement dans le temps.",
    },
    {
      title: 'Le besoin avant la technologie',
      text: "Nous ne défendons ni une marque, ni un éditeur. Chaque choix est guidé par vos besoins, afin de construire un système d'information cohérent, durable et réellement adapté à votre entreprise.",
    },
  ],
};

export const references = [
  { name: 'Printvallée', src: '/images/references/printvallee.png' },
  { name: 'Fondation pour le Logement', src: '/images/references/fondation-logement.png' },
  { name: "Val d'Oise Habitat", src: '/images/references/valdoise-habitat.png' },
  { name: 'Eurogerm', src: '/images/references/eurogerm.png' },
  { name: 'Veolia', src: '/images/references/veolia.png' },
  { name: 'Unilever', src: '/images/references/unilever.png' },
  { name: 'Bauer Media Group', src: '/images/references/bauer-media.png' },
  { name: 'Team Creatif Group', src: '/images/references/team-creatif.png' },
  { name: 'Register', src: '/images/references/register.png' },
  { name: 'Éditialis', src: '/images/references/editialis.png' },
];

export const stakeholderReasons = {
  eyebrow: 'Pourquoi travailler avec Keenton',
  title: 'Un partenaire technique qui rend les décisions plus simples',
  intro: "L'objectif n'est pas d'ajouter des outils ou des contrats, mais de rendre l'informatique plus lisible, plus fiable et plus facile à piloter.",
  audiences: [
    {
      title: 'Pour vos équipes techniques',
      points: [
        'Une vision documentée des dépendances et des priorités.',
        'Des interlocuteurs techniques capables de concevoir et d’exploiter.',
        'Un accompagnement qui préserve l’autonomie de vos équipes.',
      ],
    },
    {
      title: 'Pour votre organisation',
      points: [
        'Des choix techniques reliés aux risques et aux usages métier.',
        'Un périmètre et des responsabilités clarifiés avant les engagements.',
        'Des arbitrages plus simples entre continuité, sécurité et investissement.',
      ],
    },
  ],
};

export const expertiseHighlights = {
  'informatique-entreprise': {
    title: 'Une infrastructure fiable pour le travail quotidien',
    text: "Réseau, connectivité, serveurs, stockage et postes de travail : nous construisons un socle cohérent, documenté et capable d'évoluer avec votre organisation.",
  },
  'hebergement-cloud': {
    title: 'Un hébergement adapté à chaque charge',
    text: "Cloud privé, public ou hybride, machines virtuelles, sauvegarde et reprise d'activité : chaque environnement est choisi selon vos données, vos contraintes et votre dépendance acceptable.",
  },
  infogerance: {
    title: 'Une exploitation suivie, sans perte de maîtrise',
    text: "Nous supervisons vos systèmes, maintenons les composants et traitons les incidents avec des engagements clairs, tout en vous donnant une vision factuelle de l'exploitation.",
  },
  cybersecurite: {
    title: "Réduire les risques avant qu'ils ne deviennent des incidents",
    text: "Gouvernance, évaluation des risques, protection, surveillance et sensibilisation : la sécurité est organisée selon votre exposition réelle et maintenue dans le temps.",
  },
  devops: {
    title: 'Du code à la production, de manière fiable',
    text: "CI/CD, Kubernetes, GitOps, infrastructure as code et observabilité : nous rendons les déploiements répétables sans transformer la plateforme en usine à gaz.",
  },
  'automatisation-ia': {
    title: 'Automatiser ce qui ralentit vos équipes',
    text: "Workflows, intégrations, agents IA et applications métier : nous ciblons des tâches concrètes, avec des résultats mesurables et un contrôle humain sur les décisions sensibles.",
  },
  'microsoft-365': {
    title: 'Un environnement Microsoft structuré et réellement adopté',
    text: "Outlook, Teams, SharePoint, OneDrive, Intune et Entra ID sont déployés comme un environnement cohérent, sécurisé et administrable dans la durée.",
  },
};

export const faq = [
  {
    question: "Pourquoi choisir un partenaire unique pour gérer votre système d'information ?",
    answer: [
      "Un partenaire unique simplifie le pilotage de votre système d'information. Vous bénéficiez d'un interlocuteur qui connaît votre environnement, coordonne les expertises et assure la cohérence des décisions techniques.",
      "Cette organisation fluidifie les échanges, facilite le suivi des projets et vous offre une vision claire de votre infrastructure. Vous passez moins de temps à coordonner les intervenants et davantage à faire avancer vos projets.",
    ],
  },
  {
    question: "Notre système d'information est complexe et peu documenté. Pouvez-vous le reprendre ?",
    answer: [
      "Oui. Au fil des années, un système d'information évolue, les technologies s'accumulent, les besoins changent, les équipes se succèdent et la documentation devient parfois incomplète.",
      "Notre première mission consiste à reprendre la maîtrise de votre environnement : documenter l'infrastructure, analyser son architecture, identifier les risques et les écarts de conformité afin de construire une feuille de route claire.",
      "Nous pouvons ensuite simplifier, consolider et faire évoluer progressivement votre système d'information, tout en préservant la continuité de service.",
    ],
    link: {
      label: 'Le defi des migrations informatique',
      href: '/blog/le-defi-des-migrations-informatique',
    },
  },
  {
    question: "Pouvez-vous améliorer la sécurité de notre système d'information sans tout remettre en question ?",
    answer: [
      "Oui. Nous privilégions une approche progressive : audit de l'existant, priorisation des risques, renforcement des bonnes pratiques et renforcement progressif de votre niveau de sécurité, tout en garantissant la continuité de vos activités.",
    ],
  },
  {
    question: 'Pouvez-vous collaborer avec notre équipe informatique ou notre prestataire ?',
    answer: [
      "Oui. Nous pouvons intervenir en complément de votre prestataire actuel sur une expertise spécifique ou collaborer avec vos équipes internes. Nous nous intégrons à votre organisation et travaillons en coordination avec les acteurs déjà en place.",
    ],
  },
  {
    question: 'Pouvez-vous nous accompagner sur un projet ponctuel ?',
    answer: [
      "Oui. Nous intervenons aussi bien sur des projets ponctuels (migration Microsoft 365, renouvellement d'infrastructure, cybersécurité, déploiement cloud...) que dans le cadre d'un partenariat sur le long terme.",
    ],
  },
  {
    question: 'Comment débute un accompagnement ?',
    answer: [
      "Chaque collaboration débute par un temps d'échange et d'analyse de votre environnement informatique, de vos usages et de vos objectifs. Cette première étape nous permet d'identifier les priorités et de définir un accompagnement adapté à votre entreprise.",
    ],
  },
  {
    question: 'Intervenez-vous à distance ou sur site ?',
    answer: [
      'Les deux. Nous privilégions le support et la prévention à distance pour leur rapidité et leur efficacité. Les interventions sur site restent essentielles pour les projets, les vérifications sur site, les opérations techniques et le maintien d’une relation de proximité avec vos équipes.',
    ],
  },
  {
    question: 'Intervenez-vous partout en France ?',
    answer: [
      'Nous accompagnons des entreprises partout en France. Une grande partie de nos prestations est réalisée à distance. Lorsque cela est nécessaire, nous intervenons également sur site, notamment pour les projets, les installations ou les opérations techniques.',
    ],
  },
];

export const pourquoi = {
  eyebrow: 'Pourquoi Keenton',
  title: 'Un partenaire technique, pas un simple prestataire',
  items: [
    {
      title: 'Accompagnement de bout en bout',
      text: "Du cadrage initial à l'exploitation quotidienne, vous échangez avec une équipe qui connaît votre contexte et son historique.",
    },
    {
      title: "Expérience de l'infrastructure",
      text: 'Une équipe issue de la production : hébergement, réseau, supervision et exploitation de plateformes réelles, pas seulement du conseil.',
    },
    {
      title: 'Approche pragmatique',
      text: 'Des choix techniques justifiés par vos besoins et vos moyens, pas par les tendances du moment.',
    },
    {
      title: 'Proximité client',
      text: 'Des échanges directs avec les personnes qui font le travail, sans couche commerciale entre vous et la technique.',
    },
    {
      title: 'Suivi dans la durée',
      text: "La relation ne s'arrête pas à la mise en production : supervision, maintenance, évolutions, documentation à jour.",
    },
  ],
};

export const besoins = {
  eyebrow: 'Pour quels besoins ?',
  title: 'Là où Keenton intervient',
  intro:
    'Keenton peut intervenir sur un périmètre ponctuel ou vous accompagner dans la durée.',
  items: [
    {
      title: 'Héberger',
      text: 'Vos applications et vos données sur une infrastructure dimensionnée pour vos usages réels.',
    },
    {
      title: 'Sécuriser',
      text: "Réduire la surface d'exposition, protéger les accès et fiabiliser les sauvegardes.",
    },
    {
      title: 'Superviser',
      text: 'Savoir en permanence ce qui fonctionne, ce qui dérive et ce qui doit être corrigé.',
    },
    {
      title: 'Automatiser',
      text: 'Éliminer les opérations manuelles répétitives et les erreurs qui les accompagnent.',
    },
    {
      title: 'Infogérer',
      text: "Déléguer l'exploitation quotidienne sans perdre la maîtrise de votre système d'information.",
    },
    {
      title: 'Moderniser',
      text: "Faire évoluer l'existant par étapes, sans rupture pour vos équipes ni vos utilisateurs.",
    },
  ],
};

export const methode = {
  eyebrow: 'Notre méthode',
  title: 'Une méthode éprouvée. Des résultats prévisibles.',
  steps: [
    {
      title: 'Comprendre',
      text: "Nous commençons par comprendre vos enjeux avant de parler de solutions. Nous analysons votre contexte, vos contraintes et vos objectifs afin de construire une réponse adaptée.",
    },
    {
      title: 'Cadrer',
      text: "Nous transformons le besoin en plan d'action. Étude de l'existant, définition du périmètre, architecture cible, planning et engagements : tout est formalisé avant le démarrage.",
    },
    {
      title: 'Déployer',
      text: "Nous avançons par étapes, jamais au hasard. Chaque phase est planifiée, réalisée et validée afin de sécuriser la mise en œuvre et limiter les impacts sur votre activité.",
    },
    {
      title: 'Documenter',
      text: "Nous vous transmettons les clés de votre infrastructure. Schémas, procédures, configurations et documentation : tout est consigné pour garantir votre autonomie et la pérennité des installations.",
    },
    {
      title: 'Accompagner',
      text: "Notre engagement commence avec la mise en production. Supervision, maintenance, évolutions et accompagnement : nous faisons vivre votre système d'information dans la durée.",
    },
  ],
};

export const blogSection = {
  eyebrow: 'Le blog',
  title: 'Nos derniers articles',
  allLabel: 'Tous les articles',
};

export const finalCta = {
  title: 'Un projet, une question, un périmètre à reprendre en main ?',
  text: 'Décrivez-nous votre situation : nous vous répondrons avec un avis technique honnête, pas avec une plaquette commerciale.',
  cta: { label: 'Parler de votre projet', href: '/contact' },
  backgroundColor: '#FFCE6B',
  titleColor: '#0A1A33',
  textColor: '#0A1A33',
  buttonVariant: 'light',
};
