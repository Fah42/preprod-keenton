<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

defineProps({
  items: { type: Array, required: true },
});

const open = ref(false);
const root = ref(null);

function onDocumentClick(event) {
  if (root.value && !root.value.contains(event.target)) open.value = false;
}

function onKeydown(event) {
  if (event.key === 'Escape') open.value = false;
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <nav ref="root" class="hidden items-center gap-2 md:flex" aria-label="Navigation principale">
    <template v-for="item in items" :key="item.label">
      <div v-if="item.children" class="relative">
        <button
          type="button"
          class="flex items-center gap-1.5 rounded-md px-3 py-2 text-[15px] font-medium text-ink transition-colors hover:text-accent"
          :aria-expanded="open"
          @click="open = !open"
        >
          {{ item.label }}
          <svg
            class="h-3 w-3 transition-transform duration-200"
            :class="open ? 'rotate-180' : ''"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <div
          v-show="open"
          class="absolute left-0 top-full mt-3 grid w-[42rem] grid-cols-2 gap-1 rounded-lg border border-line bg-surface p-2 shadow-xl shadow-ink/10"
        >
          <a
            v-for="child in item.children"
            :key="child.href"
            :href="child.href"
            :style="{ '--item-accent': child.accentColor }"
            class="group block rounded-md px-4 py-3 transition-colors hover:bg-[color-mix(in_srgb,var(--item-accent)_8%,white)]"
          >
            <span class="block text-sm font-medium text-ink transition-colors group-hover:text-[var(--item-accent)]">{{ child.label }}</span>
            <span class="mt-0.5 block text-xs text-ink-secondary">{{ child.short }}</span>
          </a>
        </div>
      </div>
      <a
        v-else
        :href="item.href"
        class="rounded-md px-3 py-2 text-[15px] font-medium text-ink transition-colors hover:text-accent"
      >
        {{ item.label }}
      </a>
    </template>
  </nav>
</template>
