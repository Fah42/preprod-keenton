// Contenu editorial de la page d'accueil.
// Modifier les textes ici ne doit jamais necessiter de toucher aux composants.

// H1 de la page : porte le mot-cle principal "services informatiques pour
// entreprises" + "infogérance" en debut de titre, lisible par un humain.
export const hero = {
	title: 'Services informatiques pour entreprises,',
	titleAccent: "de la conception à l'infogérance",
	image: {
		src: '/images/hero-home.png',
		alt: 'Les sept domaines d’expertise Keenton',
	},
	subtitle:
		"Infrastructure, hébergement cloud, cybersécurité, DevOps, Microsoft 365 et IA : une équipe d'ingénieurs conçoit, sécurise et exploite votre système d'information. Et en répond dans la durée.",
  primaryCta: { label: 'Parler de votre projet', href: '/contact' },
  secondaryCta: { label: 'Découvrir nos expertises', href: '#expertises' },
};

// En-tete de la section "Nos expertises" (H2 porteur pour le SEO).
export const expertisesSection = {
	eyebrow: 'Nos expertises',
	title: 'Sept expertises. Une vision. Un seul interlocuteur.',
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
    title: 'd’uptime. Toujours en production.',
    displayLines: ['d’uptime.', 'Toujours en production.'],
    foundedYear: 2016,
  },
];

export const philosophy = {
  eyebrow: 'Notre philosophie',
  intro: "Nous ne vendons pas des technologies. Nous construisons des systèmes d'information capables d'accompagner votre entreprise pendant des années.",
  principles: [
    {
      title: 'La simplicité avant tout',
      text: "Une infrastructure doit être comprise, documentée et maintenable. Une architecture complexe n'est pas une preuve d'expertise, c'est souvent une dette technique.",
    },
    {
      title: 'La sécurité dès la conception',
      text: "La cybersécurité ne s'ajoute pas après un projet. Elle fait partie de chaque décision : réseau, cloud, postes de travail, sauvegardes ou Microsoft 365.",
    },
    {
      title: 'Penser long terme',
      text: "Chaque choix doit rester pertinent dans cinq ou dix ans. Nous privilégions les solutions pérennes aux effets de mode.",
    },
    {
      title: 'Expliquer plutôt qu’imposer',
      text: "Nos clients restent maîtres de leur système d'information. Nous prenons le temps d'expliquer les choix techniques afin que chaque décision soit comprise.",
    },
    {
      title: 'Faire évoluer plutôt que reconstruire',
      text: "Une bonne infrastructure grandit avec l'entreprise. Nous préférons concevoir des fondations solides plutôt que remplacer régulièrement l'existant.",
    },
    {
      title: 'La bonne technologie est celle dont vous avez besoin',
      text: "Nous ne défendons ni une marque, ni un éditeur, ni une mode. Nous choisissons les solutions qui répondent le mieux à votre contexte. Notre objectif n'est pas de vendre un produit, mais de construire un système d'information cohérent, durable et adapté à votre entreprise.",
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
  { question: 'Pouvez-vous reprendre une infrastructure existante ?', answer: "Oui. Nous commençons par cartographier l'existant, ses dépendances et les responsabilités en place avant de proposer une trajectoire de reprise progressive." },
  { question: 'Intervenez-vous à distance ou sur site ?', answer: "Les opérations courantes peuvent être réalisées à distance. Les études sur site, installations et interventions qui le nécessitent sont organisées selon le périmètre." },
  { question: 'Accompagnez-vous les PME comme les équipes techniques structurées ?', answer: "Oui. Le niveau d'accompagnement s'adapte à l'autonomie de vos équipes : prise en charge complète, renfort ponctuel ou responsabilité partagée." },
  { question: 'Comment commence une collaboration ?', answer: "Par un échange de cadrage, suivi si nécessaire d'une étude sur site. Le périmètre, les priorités, les responsabilités et les prochaines étapes sont ensuite posés clairement." },
  { question: 'Pouvez-vous intervenir sur un besoin ponctuel ?', answer: "Oui. Keenton peut traiter un projet identifié, réaliser une étude sur site ou accompagner une migration, puis vous laisser l'exploitation documentée ou poursuivre le suivi." },
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
  title: 'Une démarche simple et vérifiable',
  steps: [
    {
      title: 'Compréhension du besoin',
      text: 'Nous commençons par écouter : votre contexte, vos contraintes, vos priorités.',
    },
    {
      title: 'Étude sur site et cadrage',
      text: "État des lieux de l'existant, périmètre clair, engagements posés par écrit.",
    },
    {
      title: 'Mise en place',
      text: 'Déploiement par étapes, avec des points de validation à chaque jalon.',
    },
    {
      title: 'Documentation',
      text: 'Chaque élément mis en place est documenté pour que votre équipe garde la main.',
    },
    {
      title: 'Maintenance et amélioration continue',
      text: "Supervision, correctifs, évolutions : le suivi ne s'arrête pas à la mise en production.",
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
