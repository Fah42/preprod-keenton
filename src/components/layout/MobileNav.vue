<script setup>
import { ref, watch } from 'vue';

defineProps({
  items: { type: Array, required: true },
  cta: { type: Object, required: true },
  configuratorCta: { type: Object, required: true },
});

const open = ref(false);

watch(open, (value) => {
  document.body.classList.toggle('overflow-hidden', value);
});
</script>

<template>
  <button
    type="button"
    class="flex h-10 w-10 items-center justify-center rounded-md text-ink md:hidden"
    :aria-expanded="open"
    :aria-label="open ? 'Fermer le menu' : 'Ouvrir le menu'"
    @click="open = !open"
  >
    <svg v-if="!open" class="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
    <svg v-else class="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
  </button>

  <div
    v-show="open"
    class="fixed inset-x-0 top-20 bottom-0 z-40 overflow-y-auto border-t border-line bg-surface md:hidden"
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
          >
            {{ child.label }}
          </a>
        </div>
        <a
          v-else
          :href="item.href"
          class="border-b border-line py-4 text-base text-ink transition-colors hover:text-accent"
        >
          {{ item.label }}
        </a>
      </template>
      <a
        :href="configuratorCta.href"
        class="mt-8 inline-flex items-center justify-center rounded-lg bg-night px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink"
      >
        {{ configuratorCta.label }}
      </a>
      <a
        :href="cta.href"
        class="mt-3 inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
      >
        {{ cta.label }}
      </a>
    </nav>
  </div>
</template>
