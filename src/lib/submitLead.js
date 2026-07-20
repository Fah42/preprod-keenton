// Envoi du lead configurateur vers le workflow n8n (voir .env.example).
// PUBLIC_N8N_CONFIGURATOR_WEBHOOK_URL est figee au build par Astro (site en
// sortie statique, pas d'adapter serveur) -- doit etre definie dans
// l'environnement qui execute `npm run build`, pas seulement en local.
const TIMEOUT_MS = 10000;

export async function submitConfiguratorLead(payload) {
	const url = import.meta.env.PUBLIC_N8N_CONFIGURATOR_WEBHOOK_URL;

	// Repli gracieux : le workflow n8n n'existe pas encore forcement au
	// moment ou le site est deploye. Pas de fetch, pas d'erreur -- l'appelant
	// (ContactForm.vue) affiche un message adapte.
	if (!url) {
		return { ok: false, reason: 'not-configured' };
	}

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
			signal: controller.signal,
		});

		if (!response.ok) {
			return { ok: false, reason: 'http', status: response.status };
		}

		return { ok: true };
	} catch {
		return { ok: false, reason: 'network' };
	} finally {
		clearTimeout(timeout);
	}
}
