<script setup>
defineProps({
  modelValue: { type: Number, required: true },
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  step: { type: Number, default: 1 },
  unit: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue']);

function onInput(event) {
  emit('update:modelValue', Number(event.target.value));
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between text-sm text-ink-secondary">
      <span>{{ min }} {{ unit }}</span>
      <span class="text-lg font-semibold text-accent">{{ modelValue }} {{ unit }}</span>
      <span>{{ max }} {{ unit }}</span>
    </div>
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      class="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-line accent-accent"
      @input="onInput"
    />
  </div>
</template>
