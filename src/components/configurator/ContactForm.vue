<script setup>
import { reactive, ref } from 'vue';
import { submitConfiguratorLead } from '../../lib/submitLead.js';
import { site } from '../../data/site.js';

const props = defineProps({
  configuration: { type: Object, required: true },
  shareUrl: { type: String, default: '' },
});

const fields = reactive({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  message: '',
});

// Honeypot anti-bot : champ invisible pour un humain, souvent rempli par les
// bots de soumission automatique. Si rempli, on affiche un faux succes sans
// rien envoyer -- pas de dependance/captcha ajoutee pour ce besoin.
const honeypot = ref('');

const status = ref('idle'); // idle | submitting | success | error | not-configured

async function onSubmit() {
  if (honeypot.value) {
    status.value = 'success';
    return;
  }

  status.value = 'submitting';

  const result = await submitConfiguratorLead({
    submittedAt: new Date().toISOString(),
    source: 'configurateur-site',
    configuration: props.configuration,
    estimation: { hasEstimate: false },
    shareUrl: props.shareUrl,
    contact: { ...fields },
    meta: { locale: 'fr-FR', userAgent: navigator.userAgent },
  });

  status.value = result.ok ? 'success' : result.reason === 'not-configured' ? 'not-configured' : 'error';
}
</script>

<template>
  <div>
    <h3 class="text-lg font-bold text-ink">Transmettez votre brief</h3>
    <p class="mt-2 text-sm text-ink-secondary">
      Un ingénieur Keenton reprend votre configuration, valide les hypothèses et vous recontacte avec un périmètre adapté.
    </p>

    <div v-if="status === 'success'" class="mt-6 rounded-lg border border-accent bg-surface-alt p-6 text-sm text-ink">
      Merci, votre demande a bien été transmise. Un expert Keenton revient vers vous rapidement.
    </div>

    <div v-else-if="status === 'not-configured'" class="mt-6 rounded-lg border border-line bg-surface-alt p-6 text-sm text-ink">
      Cette fonctionnalité arrive bientôt. Votre configuration reste disponible via le lien
      ci-dessus — vous pouvez nous contacter directement en attendant.
      <a :href="site.cta.href" class="mt-3 inline-flex items-center gap-2 font-semibold text-accent hover:text-accent-dark">
        {{ site.cta.label }} →
      </a>
    </div>

    <form v-else class="mt-6 space-y-4" @submit.prevent="onSubmit">
      <div class="grid gap-4 sm:grid-cols-2">
        <input
          v-model="fields.firstName"
          type="text"
          placeholder="Prénom"
          required
          class="rounded-lg border border-line px-4 py-2.5 text-sm text-ink placeholder:text-ink-secondary focus:border-accent focus:outline-none"
        />
        <input
          v-model="fields.lastName"
          type="text"
          placeholder="Nom"
          required
          class="rounded-lg border border-line px-4 py-2.5 text-sm text-ink placeholder:text-ink-secondary focus:border-accent focus:outline-none"
        />
      </div>
      <input
        v-model="fields.email"
        type="email"
        placeholder="vous@exemple.fr"
        required
        class="w-full rounded-lg border border-line px-4 py-2.5 text-sm text-ink placeholder:text-ink-secondary focus:border-accent focus:outline-none"
      />
      <div class="grid gap-4 sm:grid-cols-2">
        <input
          v-model="fields.company"
          type="text"
          placeholder="Société"
          class="rounded-lg border border-line px-4 py-2.5 text-sm text-ink placeholder:text-ink-secondary focus:border-accent focus:outline-none"
        />
        <input
          v-model="fields.phone"
          type="tel"
          placeholder="Téléphone (optionnel)"
          class="rounded-lg border border-line px-4 py-2.5 text-sm text-ink placeholder:text-ink-secondary focus:border-accent focus:outline-none"
        />
      </div>
      <textarea
        v-model="fields.message"
        rows="3"
        placeholder="Contexte, contraintes, questions (optionnel)"
        class="w-full rounded-lg border border-line px-4 py-2.5 text-sm text-ink placeholder:text-ink-secondary focus:border-accent focus:outline-none"
      />

      <!-- Honeypot : hors ecran, invisible pour un humain -->
      <div class="absolute -left-[9999px]" aria-hidden="true">
        <input v-model="honeypot" type="text" tabindex="-1" autocomplete="off" />
      </div>

      <p v-if="status === 'error'" class="text-sm text-red-600">
        Une erreur est survenue. Réessayez, ou contactez-nous directement.
      </p>

      <button
        type="submit"
        :disabled="status === 'submitting'"
        class="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
      >
        {{ status === 'submitting' ? 'Envoi…' : 'Recevoir mon devis' }}
      </button>
    </form>
  </div>
</template>
