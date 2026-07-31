<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { submitContactLead } from '../../lib/submitContact.js';
import Icon from '../ui/Icon.vue';

const props = defineProps({
  roles: {
    type: Array,
    default: () => [],
  },
});

const fields = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  targetRole: '',
  currentSituation: '',
  availability: '',
  mobility: '',
  profileUrl: '',
  motivation: '',
});

const honeypot = ref('');
const status = ref('idle');
const cvFile = ref(null);
const cvError = ref('');
const MAX_CV_SIZE = 5 * 1024 * 1024;

const cvFileSize = computed(() => {
  if (!cvFile.value) return '';
  return `${(cvFile.value.size / 1024 / 1024).toFixed(1).replace('.', ',')} Mo`;
});

onMounted(() => {
  const role = new URLSearchParams(window.location.search).get('role');
  if (role && props.roles.some((candidateRole) => candidateRole.value === role)) {
    fields.targetRole = role;
  }
});

async function onSubmit() {
  if (honeypot.value) {
    status.value = 'success';
    return;
  }

  if (!cvFile.value) {
    cvError.value = 'Ajoutez votre CV au format PDF pour poursuivre.';
    return;
  }

  status.value = 'submitting';

  let cvContentBase64;
  try {
    cvContentBase64 = await readFileAsBase64(cvFile.value);
  } catch {
    status.value = 'error';
    return;
  }

  const message = [
    `Profil visé : ${fields.targetRole}`,
    `Situation actuelle : ${fields.currentSituation}`,
    `Disponibilité : ${fields.availability}`,
    `Mobilité : ${fields.mobility}`,
    fields.profileUrl ? `Profil ou portfolio : ${fields.profileUrl}` : '',
    '',
    fields.motivation,
  ].filter((line, index, lines) => line || (index > 0 && lines[index - 1])).join('\n');

  const result = await submitContactLead({
    submittedAt: new Date().toISOString(),
    source: 'formulaire-recrutement-site',
    contact: {
      firstName: fields.firstName,
      lastName: fields.lastName,
      email: fields.email,
      company: '',
      phone: fields.phone,
      subject: 'recruitment',
      message,
    },
    recruitment: {
      targetRole: fields.targetRole,
      currentSituation: fields.currentSituation,
      availability: fields.availability,
      mobility: fields.mobility,
      profileUrl: fields.profileUrl,
      motivation: fields.motivation,
      cv: {
        name: cvFile.value.name,
        type: cvFile.value.type || 'application/pdf',
        size: cvFile.value.size,
        contentBase64: cvContentBase64,
      },
    },
    meta: { locale: 'fr-FR', userAgent: navigator.userAgent },
  });

  status.value = result.ok
    ? 'success'
    : result.reason === 'not-configured'
      ? 'not-configured'
      : 'error';
}

function onCvChange(event) {
  const file = event.target.files?.[0];
  cvFile.value = null;
  cvError.value = '';

  if (!file) return;

  const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  if (!isPdf) {
    cvError.value = 'Le CV doit être fourni au format PDF.';
    event.target.value = '';
    return;
  }

  if (file.size > MAX_CV_SIZE) {
    cvError.value = 'Le fichier dépasse la taille maximale de 5 Mo.';
    event.target.value = '';
    return;
  }

  cvFile.value = file;
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '');
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
</script>

<template>
  <div aria-live="polite">
    <div v-if="status === 'success'" class="rounded-2xl border border-accent/45 bg-accent/8 p-7 md:p-9">
      <h2 class="text-2xl font-bold text-ink">Merci, nous avons bien reçu votre candidature.</h2>
      <p class="mt-3 max-w-xl leading-relaxed text-ink-secondary">
        L’équipe prendra le temps de découvrir votre parcours et reviendra vers vous si une première rencontre semble pertinente.
      </p>
      <a href="/recrutement" class="mt-6 inline-flex text-sm font-semibold text-accent-dark hover:text-accent">
        Retour à la page recrutement →
      </a>
    </div>

    <div v-else-if="status === 'not-configured'" class="rounded-2xl border border-line bg-surface-alt p-7 text-sm leading-relaxed text-ink">
      L’envoi du formulaire n’est pas encore activé. Votre candidature n’a pas été transmise.
    </div>

    <form v-else class="space-y-9" @submit.prevent="onSubmit">
      <fieldset>
        <legend class="flex items-center gap-3 text-xl font-semibold text-ink">
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-accent/12 font-mono text-xs text-accent-dark">01</span>
          Faisons connaissance
        </legend>

        <div class="mt-6 grid gap-5 sm:grid-cols-2">
          <label class="block text-sm font-medium text-ink">
            Prénom
            <input v-model="fields.firstName" required type="text" autocomplete="given-name" class="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20" />
          </label>
          <label class="block text-sm font-medium text-ink">
            Nom
            <input v-model="fields.lastName" required type="text" autocomplete="family-name" class="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20" />
          </label>
          <label class="block text-sm font-medium text-ink">
            E-mail
            <input v-model="fields.email" required type="email" autocomplete="email" placeholder="vous@exemple.fr" class="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-secondary/55 focus:border-accent focus:ring-2 focus:ring-accent/20" />
          </label>
          <label class="block text-sm font-medium text-ink">
            Téléphone <span class="font-normal text-ink-secondary">(optionnel)</span>
            <input v-model="fields.phone" type="tel" autocomplete="tel" class="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20" />
          </label>
        </div>
      </fieldset>

      <fieldset class="border-t border-line pt-9">
        <legend class="flex items-center gap-3 text-xl font-semibold text-ink">
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-accent/12 font-mono text-xs text-accent-dark">02</span>
          Votre projet professionnel
        </legend>

        <div class="mt-6 grid gap-5 sm:grid-cols-2">
          <label class="block text-sm font-medium text-ink">
            Quel profil vous intéresse ?
            <select v-model="fields.targetRole" required class="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20">
              <option value="" disabled>Sélectionnez un profil</option>
              <option v-for="role in roles" :key="role.value" :value="role.value">{{ role.label }}</option>
            </select>
          </label>

          <label class="block text-sm font-medium text-ink">
            Quelle est votre situation actuelle ?
            <select v-model="fields.currentSituation" required class="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20">
              <option value="" disabled>Sélectionnez une situation</option>
              <option>En poste</option>
              <option>En recherche d’emploi</option>
              <option>En études ou en formation</option>
              <option>En reconversion</option>
              <option>Autre situation</option>
            </select>
          </label>

          <label class="block text-sm font-medium text-ink">
            Quand pourriez-vous nous rejoindre ?
            <select v-model="fields.availability" required class="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20">
              <option value="" disabled>Sélectionnez une disponibilité</option>
              <option>Dès maintenant</option>
              <option>Sous un mois</option>
              <option>Dans un à trois mois</option>
              <option>Dans plus de trois mois</option>
              <option>À discuter</option>
            </select>
          </label>

          <label class="block text-sm font-medium text-ink">
            Pouvez-vous intervenir à Pantin et chez nos clients ?
            <select v-model="fields.mobility" required class="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20">
              <option value="" disabled>Sélectionnez une réponse</option>
              <option>Oui</option>
              <option>Occasionnellement</option>
              <option>À discuter</option>
            </select>
          </label>
        </div>
      </fieldset>

      <fieldset class="border-t border-line pt-9">
        <legend class="flex items-center gap-3 text-xl font-semibold text-ink">
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-accent/12 font-mono text-xs text-accent-dark">03</span>
          Ce que nous aimerions comprendre
        </legend>

        <div class="mt-6 space-y-5">
          <label class="block text-sm font-medium text-ink">
            Qu’aimeriez-vous faire, construire ou apprendre chez Keenton ?
            <textarea v-model="fields.motivation" required minlength="40" rows="7" placeholder="Parlez-nous d’un sujet concret, d’une expérience ou simplement de ce qui vous donne envie de nous rejoindre…" class="mt-2 w-full resize-y rounded-lg border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-secondary/55 focus:border-accent focus:ring-2 focus:ring-accent/20" />
          </label>

          <div>
            <label for="recruitment-cv" class="block text-sm font-medium text-ink">Votre CV</label>
            <label
              for="recruitment-cv"
              class="group mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition-[border-color,background-color] focus-within:border-accent focus-within:bg-accent/6"
              :class="cvFile ? 'border-accent bg-accent/6' : cvError ? 'border-red-400 bg-red-50' : 'border-line bg-surface-alt hover:border-accent/60 hover:bg-accent/4'"
            >
              <input
                id="recruitment-cv"
                required
                type="file"
                accept="application/pdf,.pdf"
                class="sr-only"
                :aria-invalid="Boolean(cvError)"
                aria-describedby="recruitment-cv-help recruitment-cv-error"
                @change="onCvChange"
              />
              <span class="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/12 text-accent-dark transition-colors group-hover:bg-accent group-hover:text-white">
                <Icon :name="cvFile ? 'check' : 'cloud-download'" class="h-6 w-6" />
              </span>
              <template v-if="cvFile">
                <strong class="mt-4 max-w-full break-all text-sm text-ink">{{ cvFile.name }}</strong>
                <span class="mt-1 text-xs text-ink-secondary">{{ cvFileSize }} · Cliquer pour remplacer</span>
              </template>
              <template v-else>
                <strong class="mt-4 text-sm text-ink">Déposez ou sélectionnez votre CV</strong>
                <span id="recruitment-cv-help" class="mt-1 text-xs text-ink-secondary">PDF obligatoire · 5 Mo maximum</span>
              </template>
            </label>
            <p v-if="cvError" id="recruitment-cv-error" role="alert" class="mt-2 text-sm text-red-700">{{ cvError }}</p>
          </div>

          <label class="block text-sm font-medium text-ink">
            Profil LinkedIn ou portfolio <span class="font-normal text-ink-secondary">(optionnel)</span>
            <input v-model="fields.profileUrl" type="url" inputmode="url" autocomplete="url" placeholder="https://" class="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-secondary/55 focus:border-accent focus:ring-2 focus:ring-accent/20" />
          </label>
        </div>
      </fieldset>

      <div class="absolute -left-[9999px]" aria-hidden="true">
        <label>Site web<input v-model="honeypot" type="text" tabindex="-1" autocomplete="off" /></label>
      </div>

      <p v-if="status === 'error'" role="alert" class="text-sm text-red-700">
        L’envoi a échoué. Vous pouvez réessayer dans quelques instants.
      </p>

      <div class="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p class="max-w-lg text-xs leading-relaxed text-ink-secondary">
          Vos informations sont utilisées uniquement pour étudier votre candidature et échanger avec vous.
        </p>
        <button type="submit" :disabled="status === 'submitting'" class="inline-flex shrink-0 items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-cta transition-[background-color,box-shadow,transform] hover:-translate-y-px hover:bg-accent-dark hover:shadow-cta-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-60 motion-reduce:hover:translate-y-0">
          {{ status === 'submitting' ? 'Envoi…' : 'Présenter mon profil' }}
        </button>
      </div>
    </form>
  </div>
</template>
