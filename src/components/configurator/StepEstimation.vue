<script setup>
import { computed, ref } from 'vue';
import ContactForm from './ContactForm.vue';
import { companyQuestions, optionLabel, securityLevels, services, supervisionLevels } from '../../data/configurator/offer.js';

const props = defineProps({ configuration: { type: Object, required: true }, shareUrl: { type: String, default: '' } });
defineEmits(['back']);

const selectedServices = computed(() => services.filter((service) => props.configuration.services.includes(service.slug)));
const companySummary = computed(() => companyQuestions.map((question) => optionLabel(question.options, props.configuration.company[question.key])).filter(Boolean));
const securityLabel = computed(() => optionLabel(securityLevels, props.configuration.security));
const supervisionLabel = computed(() => optionLabel(supervisionLevels, props.configuration.supervision));
const copied = ref(false);

async function copyLink() {
  try { await navigator.clipboard.writeText(props.shareUrl); copied.value = true; setTimeout(() => (copied.value = false), 2000); } catch {}
}
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-ink">Votre configuration</h2>
    <p class="mt-2 text-ink-secondary">Ce brief sera transmis avec votre demande. Un ingénieur pourra ensuite valider le périmètre et le chiffrage.</p>

    <div class="mt-8 grid gap-4 sm:grid-cols-2">
      <section class="rounded-xl border border-line bg-surface-alt p-5">
        <p class="font-mono text-xs uppercase tracking-[0.15em] text-ink-secondary">Entreprise</p>
        <p class="mt-3 font-semibold text-ink">{{ companySummary.length ? companySummary.join(' · ') : 'Profil non renseigné' }}</p>
      </section>
      <section class="rounded-xl border border-line bg-surface-alt p-5">
        <p class="font-mono text-xs uppercase tracking-[0.15em] text-ink-secondary">Services</p>
        <ul class="mt-3 space-y-1 text-sm text-ink"><li>Socle infrastructure</li><li v-for="service in selectedServices" :key="service.slug">{{ service.label }}</li></ul>
      </section>
      <section class="rounded-xl border border-line bg-surface-alt p-5">
        <p class="font-mono text-xs uppercase tracking-[0.15em] text-accent-dark">Cybersécurité</p>
        <p class="mt-3 font-semibold text-ink">{{ securityLabel }}</p>
      </section>
      <section class="rounded-xl border border-line bg-surface-alt p-5">
        <p class="font-mono text-xs uppercase tracking-[0.15em] text-accent-dark">Supervision</p>
        <p class="mt-3 font-semibold text-ink">{{ supervisionLabel }}</p>
      </section>
    </div>

    <div class="mt-6 flex flex-wrap gap-3">
      <button type="button" class="rounded-lg border border-accent px-5 py-2.5 text-sm font-semibold text-accent hover:bg-surface-alt" @click="copyLink">{{ copied ? 'Lien copié' : 'Copier le lien' }}</button>
      <button type="button" class="rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:border-accent" @click="$emit('back')">← Modifier</button>
    </div>

    <div class="mt-10 border-t border-line pt-10">
      <ContactForm :configuration="configuration" :share-url="shareUrl" />
    </div>
  </div>
</template>
