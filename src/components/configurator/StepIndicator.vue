<script setup>
defineProps({ current: { type: Number, required: true } });
defineEmits(['navigate']);

const steps = [
  { number: 1, label: 'Entreprise' },
  { number: 2, label: 'Services' },
  { number: 3, label: 'Protections' },
  { number: 4, label: 'Récapitulatif' },
];
</script>

<template>
  <div class="grid grid-cols-4 border-b border-line" role="tablist" aria-label="Étapes du configurateur">
    <button
      v-for="step in steps"
      :key="step.number"
      type="button"
      role="tab"
      :aria-selected="step.number === current"
      :disabled="step.number > current"
      class="relative flex flex-col items-center gap-1 px-2 py-4 text-center transition-colors disabled:cursor-default sm:flex-row sm:justify-center sm:gap-2"
      :class="step.number <= current ? 'text-ink' : 'text-ink-secondary'"
      @click="step.number < current && $emit('navigate', step.number)"
    >
      <span class="font-mono text-xs" :class="step.number < current ? 'text-accent' : ''">
        {{ step.number < current ? '✓' : String(step.number).padStart(2, '0') }}
      </span>
      <span class="text-[11px] font-semibold sm:text-sm">{{ step.label }}</span>
      <span v-if="step.number === current" class="absolute inset-x-0 bottom-0 h-0.5 bg-accent" />
    </button>
  </div>
</template>
