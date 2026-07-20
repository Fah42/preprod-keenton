// Config des briques de l'etape 2 (Dimensionnement), une entree par slug de
// `expertises` (src/data/site.js) -- l'etape 1 du configurateur reutilise
// directement ce tableau `expertises`, pas de duplication de contenu ici.
//
// Chaque brique : { id, type: 'cards'|'slider', label, param, options|range,
// default, showIf? }. `param` est la cle utilisee dans l'URL (partage de
// config). `showIf(answers)` cache/affiche une brique selon les reponses
// deja donnees (ex: le choix du fournisseur cloud seulement si
// infraType=cloud-public). Pas de prix (`price`) sur une option = brique
// purement qualitative, utilisee dans le recap mais jamais dans
// computeEstimate() (pricing.js).
//
// Pas de colocation datacenter ni de serveur dedie : offres non proposees
// par Keenton, qui vend uniquement du VM (Nutanix) ou du Kubernetes managé
// (en propre) et du cloud public managé (AWS/Azure/GCP/Scaleway/OVHcloud).

import { PRA_OPTIONS, INFOGERANCE_OPTIONS, SAUVEGARDES_OPTIONS } from './pricing.js';

const INFRA_TYPE_OPTIONS = [
	{ value: 'cloud-public', label: 'Cloud public managé', subtitle: 'AWS, Azure, GCP, Scaleway, OVHcloud', icon: 'cloud' },
	{ value: 'vm-nutanix', label: 'VM Nutanix', subtitle: 'Virtualisation managée sur notre cluster Nutanix', icon: 'layers' },
	{ value: 'kubernetes', label: 'Kubernetes managé', subtitle: 'Cluster managé sur notre infrastructure Nutanix', icon: 'scale' },
];

const CLOUD_PROVIDER_OPTIONS = [
	{ value: 'aws', label: 'AWS', icon: 'cloud' },
	{ value: 'azure', label: 'Microsoft Azure', icon: 'layers' },
	{ value: 'gcp', label: 'Google Cloud', icon: 'chart' },
	{ value: 'scaleway', label: 'Scaleway', icon: 'globe' },
	{ value: 'ovhcloud', label: 'OVHcloud', icon: 'database' },
];

export const categories = [
	{
		slug: 'hebergement-cloud',
		hasEstimate: true,
		intro:
			"Cloud public managé, VM ou cluster Kubernetes sur notre infrastructure Nutanix : dimensionnez votre besoin. Infogérance heures ouvrées et PRA inclus par défaut.",
		bricks: [
			{
				id: 'infra-type',
				type: 'cards',
				label: "Quel type d'infrastructure ?",
				param: 'infraType',
				options: INFRA_TYPE_OPTIONS,
				default: 'cloud-public',
			},
			{
				id: 'cloud-provider',
				type: 'cards',
				label: 'Quel fournisseur cloud ?',
				param: 'provider',
				options: CLOUD_PROVIDER_OPTIONS,
				default: 'aws',
				showIf: (a) => a.infraType === 'cloud-public',
			},
			{
				id: 'cpu',
				type: 'slider',
				label: 'vCPU nécessaires',
				param: 'cpu',
				min: 2,
				max: 32,
				step: 1,
				unit: 'vCPU',
				default: 4,
			},
			{
				id: 'ram',
				type: 'slider',
				label: 'RAM nécessaire',
				param: 'ram',
				min: 2,
				max: 128,
				step: 2,
				unit: 'Go',
				default: 8,
			},
			{
				id: 'storage',
				type: 'slider',
				label: 'Espace disque nécessaire',
				param: 'storage',
				min: 20,
				max: 1000,
				step: 10,
				unit: 'Go',
				default: 50,
			},
			{
				id: 'pra',
				type: 'cards',
				label: "PRA (plan de reprise d'activité)",
				param: 'pra',
				options: PRA_OPTIONS,
				default: 'standard',
			},
			{
				id: 'infogerance',
				type: 'cards',
				label: 'Infogérance',
				param: 'infogerance',
				options: INFOGERANCE_OPTIONS,
				default: 'heures-ouvrees',
			},
			{
				id: 'sauvegardes',
				type: 'cards',
				label: 'Sauvegardes',
				param: 'sauvegardes',
				options: SAUVEGARDES_OPTIONS,
				default: 'standard',
			},
		],
	},
	{
		slug: 'infogerance',
		hasEstimate: true,
		intro:
			"Déléguer l'exploitation de vos serveurs et de vos postes utilisateurs, sans perdre la maîtrise de votre système d'information.",
		bricks: [
			{
				id: 'perimetre',
				type: 'cards',
				label: 'Combien de serveurs à infogérer ?',
				param: 'perimetre',
				options: [
					{ value: '0', label: 'Aucun serveur' },
					{ value: '1-3', label: '1 à 3 serveurs' },
					{ value: '4-10', label: '4 à 10 serveurs' },
					{ value: '10+', label: 'Plus de 10 serveurs' },
				],
				default: '1-3',
			},
			{
				id: 'postes',
				type: 'cards',
				label: 'Combien de postes utilisateurs à infogérer ?',
				param: 'postes',
				options: [
					{ value: '0', label: 'Aucun poste' },
					{ value: '1-10', label: '1 à 10 postes' },
					{ value: '11-30', label: '11 à 30 postes' },
					{ value: '30+', label: 'Plus de 30 postes' },
				],
				default: '0',
			},
			{
				id: 'infogerance',
				type: 'cards',
				label: 'Niveau de service',
				param: 'infogerance',
				options: INFOGERANCE_OPTIONS,
				default: 'heures-ouvrees',
			},
			{
				id: 'sauvegardes',
				type: 'cards',
				label: 'Sauvegardes',
				param: 'sauvegardes',
				options: SAUVEGARDES_OPTIONS,
				default: 'aucune',
			},
		],
	},
	{
		slug: 'cybersecurite',
		hasEstimate: true,
		intro:
			'Protéger vos données, sécuriser les accès et garantir la continuité de votre activité. PRA inclus par défaut sur toutes nos VM.',
		bricks: [
			{
				id: 'firewall',
				type: 'cards',
				label: 'Firewall managé',
				param: 'firewall',
				options: [
					{ value: 'non', label: 'Non', subtitle: "Vous gérez votre pare-feu" },
					{ value: 'oui', label: 'Oui', subtitle: 'Pare-feu géré par Keenton' },
				],
				default: 'non',
			},
			{
				id: 'pra',
				type: 'cards',
				label: "PRA (plan de reprise d'activité)",
				param: 'pra',
				options: PRA_OPTIONS,
				default: 'standard',
			},
			{
				id: 'sauvegardes',
				type: 'cards',
				label: 'Sauvegardes',
				param: 'sauvegardes',
				options: SAUVEGARDES_OPTIONS,
				default: 'standard',
			},
		],
	},
	{
		slug: 'devops',
		hasEstimate: false,
		intro: 'Automatiser vos déploiements et fiabiliser vos environnements. Aucune grille tarifaire standard pour ce périmètre : un expert vous recontacte avec un chiffrage adapté.',
		bricks: [
			{
				id: 'cicd',
				type: 'cards',
				label: 'Avez-vous déjà du CI/CD en place ?',
				param: 'cicd',
				options: [
					{ value: 'non', label: 'Non, à mettre en place' },
					{ value: 'oui', label: 'Oui, à améliorer/fiabiliser' },
				],
				default: 'non',
			},
			{
				id: 'kubernetes',
				type: 'cards',
				label: 'Besoin Kubernetes ?',
				param: 'kubernetes',
				options: [
					{ value: 'non', label: 'Pas besoin' },
					{ value: 'leger', label: 'Cluster léger' },
					{ value: 'production', label: 'Cluster production' },
				],
				default: 'non',
			},
			{
				id: 'environments',
				type: 'cards',
				label: "Nombre d'environnements",
				param: 'environments',
				options: [
					{ value: '1', label: '1 environnement' },
					{ value: '2-3', label: '2 à 3 (dev/staging/prod)' },
					{ value: '4+', label: '4 environnements ou plus' },
				],
				default: '1',
			},
			{
				id: 'gitops',
				type: 'cards',
				label: 'Approche GitOps souhaitée ?',
				param: 'gitops',
				options: [
					{ value: 'non', label: 'Non' },
					{ value: 'oui', label: 'Oui' },
				],
				default: 'non',
			},
		],
	},
	{
		slug: 'automatisation-ia',
		hasEstimate: false,
		intro: 'Construire des outils métiers connectés à vos données. Aucune grille tarifaire standard pour ce périmètre : un expert vous recontacte avec un chiffrage adapté.',
		bricks: [
			{
				id: 'project-type',
				type: 'cards',
				label: 'Quel type de projet ?',
				param: 'projectType',
				options: [
					{ value: 'agents-ia', label: 'Agents IA' },
					{ value: 'rag', label: 'RAG documentaire' },
					{ value: 'chatbot', label: 'Chatbots & assistants' },
					{ value: 'automatisation', label: 'Automatisation de processus' },
					{ value: 'app-metier', label: 'Application métier sur mesure' },
				],
				default: 'agents-ia',
			},
			{
				id: 'data-volume',
				type: 'cards',
				label: 'Volumétrie de données',
				param: 'dataVolume',
				options: [
					{ value: 'faible', label: 'Peu de données' },
					{ value: 'modere', label: 'Volume modéré' },
					{ value: 'gros', label: 'Gros volume / multi-sources' },
				],
				default: 'faible',
			},
			{
				id: 'integration',
				type: 'cards',
				label: "Niveau d'intégration à l'existant",
				param: 'integration',
				options: [
					{ value: 'aucune', label: 'Aucune intégration existante' },
					{ value: 'quelques-outils', label: 'Connexion à quelques outils' },
					{ value: 'poussee', label: 'Intégration poussée (CRM, ERP...)' },
				],
				default: 'aucune',
			},
		],
	},
	{
		slug: 'informatique-entreprise',
		hasEstimate: false,
		intro: "Réseau, téléphonie, postes de travail : l'informatique du quotidien de votre entreprise. Aucune grille tarifaire standard pour ce périmètre : un expert vous recontacte avec un chiffrage adapté.",
		bricks: [
			{
				id: 'perimetre',
				type: 'cards',
				label: 'Quel est le périmètre principal ?',
				param: 'perimetre',
				options: [
					{ value: 'reseau', label: 'Réseau & connectivité' },
					{ value: 'telephonie', label: 'Téléphonie & communications' },
					{ value: 'serveurs', label: 'Serveurs & stockage' },
					{ value: 'securite-physique', label: "Contrôle d'accès & vidéosurveillance" },
				],
				default: 'reseau',
			},
			{
				id: 'sites',
				type: 'cards',
				label: 'Combien de sites à équiper ?',
				param: 'sites',
				options: [
					{ value: '1', label: '1 site' },
					{ value: '2-5', label: '2 à 5 sites' },
					{ value: '5+', label: 'Plus de 5 sites' },
				],
				default: '1',
			},
		],
	},
	{
		slug: 'microsoft-365',
		hasEstimate: false,
		intro: 'Messagerie, Teams, SharePoint, Intune : votre environnement Microsoft géré de bout en bout. Aucune grille tarifaire standard pour ce périmètre : un expert vous recontacte avec un chiffrage adapté.',
		bricks: [
			{
				id: 'perimetre',
				type: 'cards',
				label: 'Quel est le périmètre principal ?',
				param: 'perimetre',
				options: [
					{ value: 'messagerie', label: 'Messagerie & archivage' },
					{ value: 'teams', label: 'Teams & Teams Phone' },
					{ value: 'sharepoint', label: 'SharePoint & OneDrive' },
					{ value: 'securite', label: 'Intune & Entra ID' },
				],
				default: 'messagerie',
			},
			{
				id: 'utilisateurs',
				type: 'cards',
				label: "Combien d'utilisateurs ?",
				param: 'utilisateurs',
				options: [
					{ value: '1-10', label: '1 à 10 utilisateurs' },
					{ value: '11-50', label: '11 à 50 utilisateurs' },
					{ value: '50+', label: 'Plus de 50 utilisateurs' },
				],
				default: '1-10',
			},
		],
	},
];

export function getCategory(slug) {
	return categories.find((c) => c.slug === slug) ?? null;
}

export function visibleBricks(category, answers) {
	if (!category) return [];
	return category.bricks.filter((b) => !b.showIf || b.showIf(answers));
}

export function defaultAnswers(category) {
	if (!category) return {};
	return Object.fromEntries(category.bricks.map((b) => [b.param, b.default]));
}
