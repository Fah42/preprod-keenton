<script setup>
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';

defineProps({
  items: { type: Array, required: true },
  cta: { type: Object, required: true },
});

const open = ref(false);
const trigger = ref(null);
const panel = ref(null);

function getFocusableElements() {
  if (!panel.value) return [];

  return [...panel.value.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')];
}

function closeMenu(restoreFocus = false) {
  open.value = false;

  if (restoreFocus) {
    nextTick(() => trigger.value?.focus());
  }
}

function toggleMenu() {
  if (open.value) {
    closeMenu(true);
    return;
  }

  open.value = true;
}

function onMenuKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeMenu(true);
    return;
  }

  if (event.key !== 'Tab') return;

  const focusableElements = getFocusableElements();
  const firstElement = focusableElements[0];
  const lastElement = focusableElements.at(-1);

  if (!firstElement || !lastElement) {
    event.preventDefault();
    panel.value?.focus();
    return;
  }

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

watch(open, async (value) => {
  document.body.classList.toggle('overflow-hidden', value);

  if (value) {
    await nextTick();
    getFocusableElements()[0]?.focus();
  }
});

onBeforeUnmount(() => {
  document.body.classList.remove('overflow-hidden');
});
</script>

<template>
  <button
    ref="trigger"
    type="button"
    class="flex h-10 w-10 items-center justify-center rounded-md text-ink md:hidden"
    :aria-expanded="open"
    aria-controls="mobile-navigation-panel"
    :aria-label="open ? 'Fermer le menu' : 'Ouvrir le menu'"
    @click="toggleMenu"
  >
    <svg v-if="!open" class="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
    <svg v-else class="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
  </button>

  <div
    id="mobile-navigation-panel"
    ref="panel"
    v-show="open"
    tabindex="-1"
    class="absolute inset-x-0 top-full z-40 h-[calc(100dvh-5rem)] overflow-y-auto border-t border-line bg-surface md:hidden"
    @keydown="onMenuKeydown"
  >
    <nav class="flex min-h-full flex-col px-6 py-8" aria-label="Navigation mobile">
      <template v-for="item in items" :key="item.label">
        <div v-if="item.children" class="border-b border-line py-4">
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {{ item.label }}
          </p>
          <a
            v-for="child in item.children"
            :key="child.href"
            :href="child.href"
            :style="{ '--item-accent': child.accentColor }"
            class="mt-3 block text-base text-ink transition-colors hover:text-[var(--item-accent)]"
            @click="closeMenu()"
          >
            {{ child.label }}
          </a>
        </div>
        <a
          v-else
          :href="item.href"
          class="border-b border-line py-4 text-base text-ink transition-colors hover:text-accent"
          @click="closeMenu()"
        >
          {{ item.label }}
        </a>
      </template>
      <a
        :href="cta.href"
        class="mt-8 inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
        @click="closeMenu()"
      >
        {{ cta.label }}
      </a>
    </nav>
  </div>
</template>
