<script setup>
// Recherche full-text sur les articles du blog via l'index statique Pagefind,
// genere au build (`pagefind --site dist`). L'import est resolu au runtime
// navigateur (@vite-ignore) : en `astro dev` l'index n'existe pas, le
// composant se masque alors de lui-meme.
import { onMounted, ref } from 'vue';

const query = ref('');
const results = ref([]);
const searched = ref(false);
const ready = ref(false);
let pagefind = null;

onMounted(async () => {
  try {
    pagefind = await import(/* @vite-ignore */ '/pagefind/pagefind.js');
    await pagefind.init();
    ready.value = true;
  } catch {
    ready.value = false;
  }
});

async function onInput() {
  const term = query.value.trim();
  if (!pagefind || !term) {
    results.value = [];
    searched.value = false;
    return;
  }
  const search = await pagefind.debouncedSearch(term, {}, 250);
  if (search === null) return;
  results.value = await Promise.all(search.results.slice(0, 6).map((result) => result.data()));
  searched.value = true;
}
</script>

<template>
  <div v-if="ready" class="mx-auto max-w-2xl">
    <label for="blog-search" class="font-mono text-xs uppercase tracking-[0.2em] text-ink-secondary">Rechercher un article</label>
    <input
      id="blog-search"
      v-model="query"
      type="search"
      placeholder="Kubernetes, sauvegarde, Copilot…"
      autocomplete="off"
      class="mt-3 w-full rounded-lg border border-line bg-surface px-4 py-3 text-ink transition-colors duration-200 placeholder:text-ink-secondary/70 focus:border-accent focus:outline-none"
      @input="onInput"
    />

    <div aria-live="polite">
      <p v-if="searched && results.length === 0" class="mt-4 text-sm text-ink-secondary">
        Aucun article ne correspond à « {{ query }} ».
      </p>
      <ul v-else-if="results.length" class="mt-4 divide-y divide-line rounded-lg border border-line bg-surface">
        <li v-for="result in results" :key="result.url">
          <a :href="result.url" class="block px-5 py-4 transition-colors duration-200 hover:bg-surface-alt">
            <span class="font-semibold text-ink">{{ result.meta.title }}</span>
            <!-- v-html sans risque : excerpt genere par Pagefind a partir de notre propre contenu statique -->
            <span class="search-excerpt mt-1 block text-sm leading-relaxed text-ink-secondary" v-html="result.excerpt"></span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.search-excerpt :deep(mark) {
  background-color: color-mix(in srgb, var(--color-accent) 22%, transparent);
  color: inherit;
  border-radius: 0.15rem;
  padding: 0 0.1rem;
}
</style>
