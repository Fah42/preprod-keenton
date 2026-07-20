<script setup>
import HelpTooltip from '../ui/HelpTooltip.vue';
import { securityLevels, supervisionLevels } from '../../data/configurator/offer.js';

defineProps({ security: { type: String, required: true }, supervision: { type: String, required: true } });
defineEmits(['update', 'back', 'next']);
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-ink">Sécurité et supervision</h2>
    <p class="mt-2 text-ink-secondary">Deux couches transverses qui s’appliquent à l’ensemble du périmètre sélectionné.</p>

    <div class="mt-8 space-y-9">
      <fieldset>
        <legend class="mb-3 text-sm font-semibold text-ink">
          <span class="inline-flex items-center gap-2">
            Cybersécurité
            <HelpTooltip text="Ce niveau indique la profondeur de protection à étudier. Il sera ajusté après l’analyse de vos risques, usages et obligations." label="Aide sur le niveau de cybersécurité" />
          </span>
        </legend>
        <div class="grid gap-3 sm:grid-cols-2">
          <button v-for="level in securityLevels" :key="level.value" type="button" class="rounded-xl border p-5 text-left transition-colors" :class="security === level.value ? 'border-accent bg-accent/8' : 'border-line bg-surface hover:border-accent'" @click="$emit('update', 'security', level.value)">
            <span class="font-semibold text-ink">{{ level.label }}</span>
            <span class="mt-1 block text-base leading-relaxed text-ink-secondary">{{ level.description }}</span>
          </button>
        </div>
      </fieldset>

      <fieldset>
        <legend class="mb-3 text-sm font-semibold text-ink">
          <span class="inline-flex items-center gap-2">
            Supervision & infogérance
            <HelpTooltip text="La supervision détecte les incidents et les dérives. L’infogérance ajoute leur traitement, la maintenance et le suivi opérationnel." label="Aide sur la supervision et l’infogérance" />
          </span>
        </legend>
        <div class="grid gap-3 sm:grid-cols-3">
          <button v-for="level in supervisionLevels" :key="level.value" type="button" class="rounded-xl border p-5 text-left transition-colors" :class="supervision === level.value ? 'border-accent bg-accent/8' : 'border-line bg-surface hover:border-accent'" @click="$emit('update', 'supervision', level.value)">
            <span class="font-semibold text-ink">{{ level.label }}</span>
            <span class="mt-1 block text-base leading-relaxed text-ink-secondary">{{ level.description }}</span>
          </button>
        </div>
      </fieldset>
    </div>

    <div class="mt-10 flex gap-3">
      <button type="button" class="rounded-lg border border-line px-6 py-3 text-sm font-semibold text-ink hover:border-accent" @click="$emit('back')">← Retour</button>
      <button type="button" class="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark" @click="$emit('next')">Voir le récapitulatif →</button>
    </div>
  </div>
</template>
