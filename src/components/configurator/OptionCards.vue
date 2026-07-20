<script setup>
import Icon from '../ui/Icon.vue';

defineProps({
  options: { type: Array, required: true }, // [{value, label, subtitle?, price?, icon?}]
  modelValue: { type: [String, null], default: null },
  size: { type: String, default: 'md' }, // 'md' (brique etape 2) | 'lg' (choix categorie etape 1)
});

const emit = defineEmits(['update:modelValue']);

function select(value) {
  emit('update:modelValue', value);
}
</script>

<template>
  <div
    class="grid gap-4"
    :class="size === 'lg' ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5' : 'sm:grid-cols-2 lg:grid-cols-3'"
  >
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      class="group relative flex flex-col rounded-xl border p-5 text-left transition-colors"
      :class="
        modelValue === option.value
          ? 'border-accent bg-surface-alt'
          : 'border-line bg-surface hover:border-accent/50'
      "
      @click="select(option.value)"
    >
      <span
        v-if="modelValue === option.value"
        class="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white"
        aria-hidden="true"
      >
        <Icon name="check" class="h-3 w-3" />
      </span>

      <Icon
        v-if="option.icon"
        :name="option.icon"
        :class="size === 'lg' ? 'h-9 w-9 text-accent' : 'h-6 w-6 text-accent'"
      />

      <span
        class="mt-3 font-semibold text-ink"
        :class="size === 'lg' ? 'text-base' : 'text-sm'"
      >
        {{ option.label }}
      </span>
      <span v-if="option.subtitle" class="mt-1 text-xs leading-relaxed text-ink-secondary">
        {{ option.subtitle }}
      </span>
      <span
        v-if="option.price"
        class="mt-3 text-xs font-semibold"
        :class="option.price === 'Inclus' ? 'text-ink-secondary' : 'text-accent'"
      >
        {{ option.price }}
      </span>
    </button>
  </div>
</template>
