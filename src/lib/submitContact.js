const TIMEOUT_MS = 10000;

export async function submitContactLead(payload) {
  const url = import.meta.env.PUBLIC_N8N_CONTACT_WEBHOOK_URL;

  if (!url) return { ok: false, reason: 'not-configured' };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    return response.ok
      ? { ok: true }
      : { ok: false, reason: 'http', status: response.status };
  } catch {
    return { ok: false, reason: 'network' };
  } finally {
    clearTimeout(timeout);
  }
}
