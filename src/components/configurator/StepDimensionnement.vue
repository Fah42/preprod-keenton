<script setup>
import Icon from '../ui/Icon.vue';
import HelpTooltip from '../ui/HelpTooltip.vue';
import { services } from '../../data/configurator/offer.js';

defineProps({ selected: { type: Array, required: true } });
defineEmits(['toggle', 'back', 'next']);
</script>

<template>
  <div>
    <div class="flex items-center gap-2">
      <h2 class="text-2xl font-bold text-ink">Choisissez vos services</h2>
      <HelpTooltip text="Vous pouvez sélectionner plusieurs services. Le choix sert à préparer le périmètre de l’échange et ne constitue pas un engagement." label="Aide sur le choix des services" />
    </div>
    <p class="mt-2 text-ink-secondary">Le socle infrastructure et le cadrage sont inclus. Ajoutez un ou plusieurs périmètres à étudier.</p>

    <div class="mt-8 grid gap-4 md:grid-cols-2">
      <button
        v-for="service in services"
        :key="service.slug"
        type="button"
        class="group flex items-start gap-4 rounded-xl border p-5 text-left transition-all"
        :class="selected.includes(service.slug) ? 'border-accent bg-accent/8' : 'border-line bg-surface hover:border-accent'"
        @click="$emit('toggle', service.slug)"
      >
        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-alt text-accent"><Icon :name="service.icon" class="h-5 w-5" /></span>
        <span>
          <span class="block font-semibold text-ink">{{ service.label }}</span>
          <span class="mt-1 block text-base leading-relaxed text-ink-secondary">{{ service.description }}</span>
        </span>
        <span class="ml-auto font-mono text-lg text-accent">{{ selected.includes(service.slug) ? '✓' : '+' }}</span>
      </button>
    </div>

    <div class="mt-10 flex gap-3">
      <button type="button" class="rounded-lg border border-line px-6 py-3 text-sm font-semibold text-ink hover:border-accent" @click="$emit('back')">← Retour</button>
      <button type="button" class="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark" @click="$emit('next')">Continuer →</button>
    </div>
  </div>
</template>
