export const recruitmentHero = {
	eyebrow: 'Recrutement',
	title: 'Rejoignez une équipe qui aime',
	titleAccent: 'comprendre, construire et faire durer.',
	subtitle:
		'Chez Keenton, la technique reste proche du terrain, des utilisateurs et des clients. Nous cherchons des personnes curieuses, rigoureuses et généreuses dans leur manière de travailler.',
	image: {
		src: '/images/recrutement-pennywise.png',
		alt: 'Hey kid, wanna join Keenton? I got Internet down here',
		fit: 'contain',
	},
	primaryCta: { label: 'Voir les profils', href: '#profils' },
	secondaryCta: { label: 'Découvrir notre culture', href: '#culture' },
};

export const recruitmentSignals = [
	{ icon: 'globe', value: 'Pantin', label: "Base de l'équipe" },
	{ icon: 'monitor', value: 'Terrain & production', label: 'Des sujets concrets' },
	{ icon: 'users', value: 'CDI & stage', label: "Plusieurs portes d'entrée" },
	{ icon: 'layers', value: 'Mac · Windows · Linux', label: 'Des environnements variés' },
];

export const recruitmentValues = [
	{
		icon: 'users',
		title: 'Faire équipe',
		text: 'Partager ses connaissances, demander de l’aide quand il le faut et contribuer à faire avancer le collectif.',
	},
	{
		icon: 'lightbulb',
		title: 'Rester curieux',
		text: 'Apprendre, expérimenter et ne jamais considérer ses acquis comme définitifs.',
	},
	{
		icon: 'zap',
		title: 'Prendre des initiatives',
		text: 'Proposer, créer et chercher une meilleure manière de résoudre les problèmes.',
	},
	{
		icon: 'check-circle',
		title: 'Travailler avec rigueur',
		text: 'La qualité, le respect et le soin apporté aux détails font pleinement partie du métier.',
	},
	{
		icon: 'award',
		title: 'Cultiver sa singularité',
		text: 'Les parcours différents, les idées originales et les compétences moins attendues enrichissent l’équipe.',
	},
	{
		icon: 'globe',
		title: 'Rester proche des clients',
		text: 'Comprendre leur réalité permet de construire des solutions réellement utiles.',
	},
];

export const recruitmentPrinciples = [
	{
		title: 'Proches du terrain',
		text: 'Les équipes techniques gardent un contact direct avec les clients et les utilisateurs.',
	},
	{
		title: 'Exigeants sans être opaques',
		text: 'Nous documentons, expliquons et assumons les décisions prises en production.',
	},
	{
		title: 'Jamais figés',
		text: 'L’innovation compte lorsqu’elle améliore vraiment la fiabilité, les usages ou le travail de l’équipe.',
	},
];

export const recruitmentRoles = [
	{
		id: 'microsoft',
		title: 'Technicien systèmes Microsoft',
		contract: 'CDI',
		location: 'Pantin',
		level: 'Tous parcours',
		summary:
			'Vous aimez comprendre les environnements Microsoft, accompagner les utilisateurs et maintenir des infrastructures en production.',
		missions: [
			'Déployer et maintenir les infrastructures de nos clients.',
			'Diagnostiquer et traiter les demandes de support.',
			'Documenter les interventions et faire progresser les pratiques.',
		],
		stack: ['Active Directory', 'Microsoft 365', 'PowerShell', 'Hyper-V', 'DNS / DHCP / GPO'],
		note: 'Les parcours en reconversion ou sans diplôme peuvent aussi nous intéresser.',
	},
	{
		id: 'linux',
		title: 'Technicien systèmes Linux',
		contract: 'CDI',
		location: 'Pantin',
		level: 'Profil confirmé',
		summary:
			'Vous prenez en charge des projets d’infrastructure de bout en bout, de l’installation au maintien en condition opérationnelle.',
		missions: [
			'Installer, configurer, optimiser et sécuriser les systèmes.',
			'Conduire des opérations de maintenance et de migration.',
			'Schématiser, documenter et transmettre les environnements.',
		],
		stack: ['Linux', 'Réseau', 'Virtualisation', 'Conteneurs', 'Supervision', 'Bash / Python'],
		note: 'La compréhension des API et des solutions de sécurité est un vrai plus.',
	},
	{
		id: 'support',
		title: 'Technicien maintenance informatique',
		contract: 'CDI',
		location: 'Pantin & sites clients',
		level: 'Support terrain',
		summary:
			'Un rôle au contact des utilisateurs, des postes de travail et des réalités quotidiennes de nos clients.',
		missions: [
			'Intervenir sur les postes Mac et PC chez les clients.',
			'Assurer le support utilisateur à distance.',
			'Préparer et maintenir les équipements.',
		],
		stack: ['Mac', 'Windows', 'Support utilisateurs', 'Matériel', 'Interventions sur site'],
		note: 'Des déplacements sont à prévoir.',
	},
	{
		id: 'commercial',
		title: 'Stage technico-commercial',
		contract: 'Stage · 2 mois',
		location: 'Pantin',
		level: 'Toute l’année',
		summary:
			'Vous découvrez la prospection B2B, la qualification des besoins et le suivi commercial au contact d’une équipe technique.',
		missions: [
			'Identifier et contacter de nouveaux prospects.',
			'Qualifier et structurer les informations dans le CRM.',
			'Participer aux réponses, au suivi et aux relances commerciales.',
		],
		stack: ['Prospection B2B', 'CRM', 'Qualification', 'Suivi commercial'],
		note: 'Keenton recherche régulièrement des stagiaires commerciaux.',
	},
];
