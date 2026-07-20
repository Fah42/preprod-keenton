<script setup>
import { icons } from '../../data/icons.js';

defineProps({
  name: { type: String, required: true },
});
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    v-html="icons[name] ?? ''"
  />
</template>
