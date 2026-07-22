<script setup>
import { nextTick, onBeforeUnmount, ref, useId } from 'vue';

defineProps({
  text: { type: String, required: true },
  label: { type: String, default: "Afficher l’aide" },
  triggerText: { type: String, default: '' },
});

const isOpen = ref(false);
const trigger = ref(null);
const bubble = ref(null);
const position = ref({ top: '0px', left: '0px', width: '20rem' });
const tooltipId = `help-tooltip-${useId()}`;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

async function updatePosition() {
  if (!isOpen.value || !trigger.value) return;

  const margin = 16;
  const gap = 10;
  const width = Math.min(320, window.innerWidth - margin * 2);
  const triggerRect = trigger.value.getBoundingClientRect();

  position.value = {
    top: '0px',
    left: `${clamp(triggerRect.left + triggerRect.width / 2 - width / 2, margin, window.innerWidth - width - margin)}px`,
    width: `${width}px`,
  };

  await nextTick();

  const bubbleHeight = bubble.value?.offsetHeight ?? 0;
  const topAbove = triggerRect.top - bubbleHeight - gap;
  const top = topAbove >= margin ? topAbove : triggerRect.bottom + gap;

  position.value = { ...position.value, top: `${top}px` };
}

async function open() {
  isOpen.value = true;
  await nextTick();
  updatePosition();
  window.addEventListener('resize', updatePosition);
  window.addEventListener('scroll', updatePosition, true);
}

function close() {
  isOpen.value = false;
  window.removeEventListener('resize', updatePosition);
  window.removeEventListener('scroll', updatePosition, true);
}

onBeforeUnmount(close);
</script>

<template>
  <span class="inline-flex align-middle">
    <button
      ref="trigger"
      type="button"
      :class="[
        'inline-flex items-center justify-center bg-accent font-bold text-white shadow-sm transition-colors hover:bg-accent-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        triggerText ? 'h-8 gap-1.5 rounded-full px-3.5 text-sm' : 'h-5 w-5 rounded-full text-xs',
      ]"
      :aria-label="label"
      :aria-describedby="isOpen ? tooltipId : undefined"
      @mouseenter="open"
      @mouseleave="close"
      @focus="open"
      @blur="close"
      @keydown.esc="close"
    >
      <span v-if="triggerText">{{ triggerText }}</span>
      <span aria-hidden="true">?</span>
    </button>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <span
          v-if="isOpen"
          :id="tooltipId"
          ref="bubble"
          role="tooltip"
          class="pointer-events-none fixed z-[100] rounded-xl bg-night px-5 py-4 text-left text-sm leading-relaxed font-normal text-white shadow-[0_18px_50px_rgb(10_16_27/0.28)] md:text-base"
          :style="position"
        >
          {{ text }}
        </span>
      </Transition>
    </Teleport>
  </span>
</template>
