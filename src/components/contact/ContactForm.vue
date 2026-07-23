<script setup>
import { onMounted, reactive, ref } from 'vue';
import { submitContactLead } from '../../lib/submitContact.js';

const fields = reactive({
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  subject: '',
  message: '',
});

const honeypot = ref('');
const status = ref('idle');

onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  const subject = params.get('subject');
  const role = params.get('role');

  if (subject === 'recruitment') fields.subject = 'recruitment';
  if (role && role.length <= 120) {
    fields.message = `Je souhaite échanger au sujet de « ${role} ».\n\n`;
  }
});

async function onSubmit() {
  if (honeypot.value) {
    status.value = 'success';
    return;
  }

  status.value = 'submitting';
  const result = await submitContactLead({
    submittedAt: new Date().toISOString(),
    source: 'formulaire-contact-site',
    contact: { ...fields },
    meta: { locale: 'fr-FR', userAgent: navigator.userAgent },
  });

  status.value = result.ok
    ? 'success'
    : result.reason === 'not-configured'
      ? 'not-configured'
      : 'error';
}
</script>

<template>
  <div>
    <div v-if="status === 'success'" class="rounded-xl border border-accent bg-accent/8 p-6 text-sm leading-relaxed text-ink">
      Votre demande a bien été transmise. L’équipe Keenton reviendra vers vous rapidement.
    </div>

    <div v-else-if="status === 'not-configured'" class="rounded-xl border border-line bg-surface-alt p-6 text-sm leading-relaxed text-ink">
      L’envoi du formulaire n’est pas encore activé. Votre message n’a pas été transmis.
    </div>

    <form v-else class="space-y-5" @submit.prevent="onSubmit">
      <div class="grid gap-5 sm:grid-cols-2">
        <label class="block text-sm font-medium text-ink">
          Prénom
          <input v-model="fields.firstName" required type="text" autocomplete="given-name" class="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent" />
        </label>
        <label class="block text-sm font-medium text-ink">
          Nom
          <input v-model="fields.lastName" required type="text" autocomplete="family-name" class="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent" />
        </label>
      </div>

      <div class="grid gap-5 sm:grid-cols-2">
        <label class="block text-sm font-medium text-ink">
          E-mail
          <input v-model="fields.email" required type="email" autocomplete="email" placeholder="vous@exemple.fr" class="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-secondary/60 focus:border-accent" />
        </label>
        <label class="block text-sm font-medium text-ink">
          Société
          <input v-model="fields.company" type="text" autocomplete="organization" class="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent" />
        </label>
      </div>

      <div class="grid gap-5 sm:grid-cols-2">
        <label class="block text-sm font-medium text-ink">
          Téléphone <span class="font-normal text-ink-secondary">(optionnel)</span>
          <input v-model="fields.phone" type="tel" autocomplete="tel" class="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent" />
        </label>
        <label class="block text-sm font-medium text-ink">
          Sujet
          <select v-model="fields.subject" required class="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent">
            <option value="" disabled>Sélectionnez un sujet</option>
            <option value="project">Nouveau projet</option>
            <option value="audit">Étude sur site ou conseil</option>
            <option value="managed-services">Infogérance et support</option>
            <option value="recruitment">Recrutement / candidature</option>
            <option value="partnership">Partenariat</option>
            <option value="other">Autre demande</option>
          </select>
        </label>
      </div>

      <label class="block text-sm font-medium text-ink">
        Votre besoin
        <textarea v-model="fields.message" required rows="6" placeholder="Contexte, périmètre, contraintes et échéance éventuelle…" class="mt-2 w-full resize-y rounded-lg border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-secondary/60 focus:border-accent" />
      </label>

      <div class="absolute -left-[9999px]" aria-hidden="true">
        <label>Site web<input v-model="honeypot" type="text" tabindex="-1" autocomplete="off" /></label>
      </div>

      <p v-if="status === 'error'" class="text-sm text-red-600">L’envoi a échoué. Vous pouvez réessayer dans quelques instants.</p>

      <div class="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p class="max-w-md text-xs leading-relaxed text-ink-secondary">Les informations saisies sont utilisées uniquement pour répondre à votre demande.</p>
        <button type="submit" :disabled="status === 'submitting'" class="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:cursor-wait disabled:opacity-60">
          {{ status === 'submitting' ? 'Envoi…' : 'Envoyer ma demande' }}
        </button>
      </div>
    </form>
  </div>
</template>
