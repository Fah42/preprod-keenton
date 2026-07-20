// ATTENTION -- PROVISOIRE, mais desormais partiellement fondee sur des
// devis/factures Keenton reels (client Fepem + client Les Enchanteurs,
// analyses le 2026-07-09), pas uniquement sur des placeholders Datacampus.
// Rien ici n'est encore une grille tarifaire publiee -- garder le
// disclaimer affiche a l'ecran (StepEstimation.vue) tant que ces chiffres
// n'ont pas ete valides formellement par Keenton.
//
// Constat issu des vraies factures (5 documents, 2 clients) : le PRA et
// l'infogerance "heures ouvrees" ne sont JAMAIS factures comme un
// supplement a part -- ils sont inclus par defaut dans l'abonnement VM
// (ligne a 0€ ou simplement decrits dans le forfait). Consequence : les
// paliers de base de PRA_OPTIONS et INFOGERANCE_OPTIONS passent a
// "Inclus" au lieu des deltas Datacampus d'origine -- les briques restent
// visibles (choix garde a la demande de Farid), juste reprix. Aucune
// donnee reelle n'existe pour un palier superieur (PRA renforce,
// astreinte 24/7) : marque "Sur devis", sans chiffre invente.
//
// Ou les nombres viennent de :
// - VM_CPU_RATE, VM_RAM_RATE, VM_DISK_RATE, VM_BASE_FEE : regression
//   lineaire (moindres carres) sur 15 VM Nutanix reellement facturees
//   (13 chez Fepem, 2 chez Les Enchanteurs). R²=0.975, erreur absolue
//   moyenne ~17€/mois, max ~40€/mois -- d'ou VM_ESTIMATE_MARGIN. Le tarif
//   n'est pas parfaitement lineaire dans la realite (ex: deux VM aux
//   specs strictement identiques 8vCPU/32Go/200Go factures 442,85€ et
//   482,80€ selon le role) : cette regression est la meilleure
//   approximation disponible, pas une grille exacte.
// - Sauvegardes : deltas Datacampus, PAS confirmes par les factures
//   Keenton (le detail sauvegarde y est aussi decrit comme inclus dans le
//   forfait VM, jamais facture separement) -- a valider en priorite.
//
// Pas de colocation datacenter : offre non proposee par Keenton (retiree
// le 2026-07-09), les tables de prix correspondantes ont ete supprimees.

export const PRA_OPTIONS = [
	{
		value: 'standard',
		label: 'PRA standard',
		subtitle: 'RPO/RTO 12 à 48h selon config',
		// Observe sur les 2 clients (Fepem : RPO/RTO 12h ; Les Enchanteurs :
		// RPO 24h/RTO 48h) -- toujours inclus dans le forfait VM, jamais
		// facture separement.
		delta: { min: 0, max: 0 },
		price: 'Inclus',
	},
	{
		value: 'renforce',
		label: 'PRA renforcé',
		subtitle: 'RPO/RTO réduits, réplication prioritaire',
		// Aucune facture Keenton ne montre ce palier -- pas de chiffre
		// invente.
		delta: { min: 0, max: 0 },
		price: 'Sur devis',
	},
];

export const INFOGERANCE_OPTIONS = [
	{
		value: 'autonome',
		label: 'Autonome',
		subtitle: 'Vous administrez le serveur',
		delta: { min: 0, max: 0 },
		price: 'Inclus',
	},
	{
		value: 'heures-ouvrees',
		label: 'Heures ouvrées',
		subtitle: 'Lun-Ven, 9h-19h',
		// Confirme inclus dans le forfait VM sur 2 clients reels (Fepem,
		// Les Enchanteurs) -- ce n'est plus un supplement facture.
		delta: { min: 0, max: 0 },
		price: 'Inclus',
	},
	{
		value: 'astreinte-24-7',
		label: 'Astreinte 24h/7j',
		subtitle: 'Intervention < 1h',
		// Aucune facture Keenton ne montre ce palier -- pas de chiffre
		// invente, contrairement a la version precedente (+130€ Datacampus).
		delta: { min: 0, max: 0 },
		price: 'Sur devis',
	},
];

export const SAUVEGARDES_OPTIONS = [
	{ value: 'aucune', label: 'Aucune', subtitle: 'Sans sauvegarde', delta: { min: 0, max: 0 }, price: 'Inclus' },
	{
		value: 'essentiel',
		label: 'Essentiel',
		subtitle: '1×/jour · 7j',
		delta: { min: 10, max: 10 },
		price: '+10 €/mois',
	},
	{
		value: 'standard',
		label: 'Standard',
		subtitle: '1×/jour · 30j',
		delta: { min: 30, max: 30 },
		price: '+30 €/mois',
	},
	{
		value: 'securise',
		label: 'Sécurisé',
		subtitle: '1×/jour · 30j · 2 DC',
		delta: { min: 60, max: 60 },
		price: '+60 €/mois',
	},
	{
		value: 'maximum',
		label: 'Maximum',
		subtitle: '3×/jour · 30j · 2 DC',
		delta: { min: 90, max: 90 },
		price: '+90 €/mois',
	},
];

// Tarif VM Nutanix par ressource, issu de la regression decrite en tete de
// fichier (15 VM reelles, 2 clients). A remplacer par la grille officielle
// Keenton des qu'elle existe.
export const VM_CPU_RATE = 10.72; // €/vCPU/mois
export const VM_RAM_RATE = 7.47; // €/Go RAM/mois
export const VM_DISK_RATE = 0.22; // €/Go disque/mois
export const VM_BASE_FEE = 90.38; // €/mois, part fixe (infra, reseau, supervision)
export const VM_ESTIMATE_MARGIN = 17; // €/mois, erreur absolue moyenne observee

// Prix ponctuel d'une VM Nutanix a partir de ses ressources. Utilise pour
// les curseurs CPU/RAM/stockage de la categorie Cloud & Infrastructure.
export function computeVmPrice(cpu, ramGo, storageGo) {
	return VM_BASE_FEE + VM_CPU_RATE * cpu + VM_RAM_RATE * ramGo + VM_DISK_RATE * storageGo;
}

function sumDeltas(...deltas) {
	return deltas.reduce(
		(acc, d) => ({ min: acc.min + (d?.min ?? 0), max: acc.max + (d?.max ?? 0) }),
		{ min: 0, max: 0 }
	);
}

function findOption(options, value) {
	return options.find((o) => o.value === value) ?? options[0];
}

// Calcule une fourchette {min, max, currency} pour une categorie donnee a
// partir des reponses (answers). Retourne null si la categorie n'a pas
// d'ancrage tarifaire reutilisable (cf. categories.js).
export function computeEstimate(categorySlug, answers) {
	switch (categorySlug) {
		case 'hebergement-cloud': {
			const sauvegardes = findOption(SAUVEGARDES_OPTIONS, answers.sauvegardes);
			const point =
				computeVmPrice(answers.cpu ?? 4, answers.ram ?? 8, answers.storage ?? 50) +
				(sauvegardes.delta.min ?? 0);
			return {
				min: Math.max(0, point - VM_ESTIMATE_MARGIN),
				max: point + VM_ESTIMATE_MARGIN,
				currency: 'EUR',
			};
		}
		case 'cybersecurite': {
			const sauvegardes = findOption(SAUVEGARDES_OPTIONS, answers.sauvegardes);
			return { ...sauvegardes.delta, currency: 'EUR' };
		}
		case 'infogerance': {
			const infogerance = findOption(INFOGERANCE_OPTIONS, answers.infogerance ?? 'heures-ouvrees');
			const sauvegardes = findOption(SAUVEGARDES_OPTIONS, answers.sauvegardes);
			const total = sumDeltas(infogerance.delta, sauvegardes.delta);
			return { ...total, currency: 'EUR' };
		}
		default:
			// devops, automatisation-ia, informatique-entreprise, microsoft-365 :
			// pas d'ancrage tarifaire reutilisable, cf. categories.js
			// (hasEstimate: false).
			return null;
	}
}
