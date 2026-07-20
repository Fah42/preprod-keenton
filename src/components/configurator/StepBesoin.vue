<script setup>
import { companyQuestions } from '../../data/configurator/offer.js';
import HelpTooltip from '../ui/HelpTooltip.vue';

defineProps({ company: { type: Object, required: true } });
defineEmits(['update', 'next']);
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold text-ink">Parlez-nous de votre entreprise</h2>
    <p class="mt-2 text-ink-secondary">Ces réponses nous aident à comprendre le contexte. Elles restent facultatives.</p>

    <div class="mt-8 space-y-8">
      <fieldset v-for="question in companyQuestions" :key="question.key">
        <legend class="mb-3 text-sm font-semibold text-ink">
          <span class="inline-flex items-center gap-2">
            {{ question.label }}
            <HelpTooltip v-if="question.help" :text="question.help" :label="`Aide sur ${question.label}`" />
          </span>
        </legend>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="option in question.options"
            :key="option.value"
            type="button"
            class="rounded-lg border px-4 py-3 text-sm transition-colors"
            :class="company[question.key] === option.value ? 'border-accent bg-accent/8 font-semibold text-accent-dark' : 'border-line bg-surface text-ink hover:border-accent'"
            @click="$emit('update', question.key, option.value)"
          >{{ option.label }}</button>
        </div>
      </fieldset>
    </div>

    <button type="button" class="mt-10 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark" @click="$emit('next')">Continuer →</button>
  </div>
</template>
