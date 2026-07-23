<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue';
import Icon from '../ui/Icon.vue';

const props = defineProps({
  item: { type: Object, required: true },
  instanceKey: { type: String, required: true },
});

const card = ref(null);
const panel = ref(null);
const closeButton = ref(null);
const isExpanded = ref(false);
const accent = ref('#388E3C');
const geometry = ref({ left: 0, top: 0, width: 0, height: 0, fromX: 0, fromY: 0, scaleX: 1, scaleY: 1 });
const dialogId = computed(() => `concept-detail-dialog-${props.instanceKey}`);
const titleId = computed(() => `concept-detail-title-${props.instanceKey}`);
const testId = computed(() => `concept-${props.item.detail.slug}`);

let closeTimer;
let reducedMotion = false;

const panelStyle = computed(() => ({
  '--concept-accent': accent.value,
  '--panel-left': `${geometry.value.left}px`,
  '--panel-top': `${geometry.value.top}px`,
  '--panel-width': `${geometry.value.width}px`,
  '--panel-height': `${geometry.value.height}px`,
  '--from-x': `${geometry.value.fromX}px`,
  '--from-y': `${geometry.value.fromY}px`,
  '--from-scale-x': geometry.value.scaleX,
  '--from-scale-y': geometry.value.scaleY,
}));

function getPanelBounds() {
  const mobile = window.innerWidth < 768;
  const horizontalMargin = mobile ? 12 : Math.max(28, Math.round(window.innerWidth * 0.045));
  const verticalMargin = mobile ? 18 : Math.max(34, Math.round(window.innerHeight * 0.08));
  const width = mobile
    ? window.innerWidth - horizontalMargin * 2
    : Math.min(960, Math.round(window.innerWidth * 0.68));
  const height = Math.min(
    mobile ? Math.round(window.innerHeight * 0.86) : 720,
    window.innerHeight - verticalMargin * 2,
  );

  return {
    left: mobile ? horizontalMargin : window.innerWidth - width - horizontalMargin,
    top: Math.max(verticalMargin, Math.round((window.innerHeight - height) / 2)),
    width,
    height,
  };
}

function updateGeometry() {
  if (!card.value) return;

  const source = card.value.getBoundingClientRect();
  const target = getPanelBounds();

  geometry.value = {
    ...target,
    fromX: source.left - target.left,
    fromY: source.top - target.top,
    scaleX: Math.max(0.08, source.width / target.width),
    scaleY: Math.max(0.08, source.height / target.height),
  };
}

async function open() {
  if (panel.value?.open) return;

  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  accent.value = getComputedStyle(card.value).getPropertyValue('--cat-accent').trim() || '#388E3C';
  updateGeometry();

  isExpanded.value = false;
  panel.value.showModal();

  await nextTick();
  window.addEventListener('resize', updateGeometry);

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      if (!panel.value?.open) return;
      isExpanded.value = true;
      closeButton.value?.focus();
    });
  });
}

function finishClose() {
  if (isExpanded.value) return;

  window.clearTimeout(closeTimer);
  panel.value?.close();
  window.removeEventListener('resize', updateGeometry);

  nextTick(() => card.value?.querySelector('[data-concept-trigger]')?.focus({ preventScroll: true }));
}

function close() {
  if (!panel.value?.open) return;
  if (!isExpanded.value) {
    finishClose();
    return;
  }

  updateGeometry();
  isExpanded.value = false;
  closeTimer = window.setTimeout(finishClose, reducedMotion ? 20 : 420);
}

function handleTransitionEnd(event) {
  if (event.target === panel.value && event.propertyName === 'transform' && !isExpanded.value) {
    finishClose();
  }
}

onBeforeUnmount(() => {
  window.clearTimeout(closeTimer);
  if (panel.value?.open) panel.value.close();
  window.removeEventListener('resize', updateGeometry);
});
</script>

<template>
  <article
    ref="card"
    class="group flex h-full flex-col rounded-xl border border-line bg-surface p-6 transition duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:border-[var(--cat-accent)] hover:bg-[color-mix(in_srgb,var(--cat-accent)_5%,white)] hover:ring-2 hover:ring-[var(--cat-accent)] hover:shadow-lg"
  >
    <Icon v-if="item.icon" :name="item.icon" class="h-6 w-6 text-[var(--cat-accent)]" />
    <h3 class="mt-4 font-semibold text-ink">{{ item.title }}</h3>
    <p v-if="item.subtitle" class="mt-1 text-sm font-medium text-[var(--cat-accent)]">{{ item.subtitle }}</p>
    <p class="mt-2 text-base leading-relaxed text-ink-secondary">{{ item.text }}</p>
    <button
      type="button"
      data-concept-trigger
      :data-testid="`${testId}-trigger`"
      class="mt-6 inline-flex w-fit items-center gap-2 border-b border-[color-mix(in_srgb,var(--cat-accent)_80%,black)] pb-1 text-sm font-semibold text-[color-mix(in_srgb,var(--cat-accent)_80%,black)] transition-[gap,color] hover:gap-3 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--cat-accent)]"
      :aria-expanded="isExpanded"
      :aria-controls="dialogId"
      aria-haspopup="dialog"
      @click="open"
    >
      En savoir plus
      <span aria-hidden="true">↗</span>
    </button>
  </article>

  <dialog
    :id="dialogId"
    ref="panel"
    :data-testid="`${testId}-panel`"
    class="concept-detail-panel overflow-hidden border border-[color-mix(in_srgb,var(--concept-accent)_45%,white)] bg-white p-0 text-ink shadow-[0_34px_90px_rgb(10_26_51/0.28)]"
    :data-expanded="isExpanded"
    :style="panelStyle"
    :aria-labelledby="titleId"
    @cancel.prevent="close"
    @click.self="close"
    @transitionend="handleTransitionEnd"
  >
    <div class="flex h-full min-h-0 w-full flex-col">
          <div class="flex h-12 shrink-0 items-center gap-4 border-b border-line bg-surface-alt px-4 sm:px-5">
            <img
              src="/images/logo-keenton.png"
              alt="Keenton"
              width="240"
              height="240"
              class="h-5 w-5 shrink-0 object-contain sm:h-6 sm:w-6"
            />
            <p class="min-w-0 flex-1 truncate text-center font-mono text-[0.65rem] tracking-[0.08em] text-ink-secondary sm:text-xs">
              expertise.keenton / fiche technique / {{ item.title.toLowerCase() }}
            </p>
            <button
              ref="closeButton"
              type="button"
              :data-testid="`${testId}-close`"
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-[var(--concept-accent)] hover:text-[var(--concept-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--concept-accent)]"
              :aria-label="`Fermer la présentation sur ${item.title}`"
              @click="close"
            >
              <svg class="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <div class="mx-auto max-w-4xl px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
              <header class="max-w-3xl">
                <p class="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--concept-accent)_80%,black)]">
                  {{ item.detail.eyebrow }}
                </p>
                <h2 :id="titleId" class="mt-4 font-heading text-3xl leading-tight font-semibold text-ink sm:text-4xl">
                  {{ item.detail.title }}
                </h2>
                <p class="mt-5 text-base leading-relaxed text-ink-secondary sm:text-lg">
                  {{ item.detail.introduction }}
                </p>
              </header>

              <div class="mt-8 rounded-2xl border border-[color-mix(in_srgb,var(--concept-accent)_25%,var(--color-line))] bg-[color-mix(in_srgb,var(--concept-accent)_5%,white)] p-5 sm:p-6">
                <p class="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-ink-secondary">Chemin de continuité</p>
                <div class="grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
                  <template v-for="(step, index) in item.detail.flow" :key="step">
                    <div class="rounded-xl border border-line bg-white px-4 py-4 text-center text-sm font-semibold text-ink shadow-sm">
                      {{ step }}
                    </div>
                    <span v-if="index < item.detail.flow.length - 1" class="hidden text-center text-xl text-[var(--concept-accent)] sm:block" aria-hidden="true">→</span>
                  </template>
                </div>
              </div>

              <div class="mt-8 grid gap-4 md:grid-cols-3">
                <div
                  v-for="section in item.detail.sections"
                  :key="section.title"
                  class="rounded-xl border border-line bg-white p-5 shadow-[0_10px_28px_rgb(10_26_51/0.055)]"
                >
                  <div class="h-1 w-10 rounded-full bg-[var(--concept-accent)]"></div>
                  <h3 class="mt-5 font-semibold leading-snug text-ink">{{ section.title }}</h3>
                  <p class="mt-3 text-sm leading-relaxed text-ink-secondary">{{ section.text }}</p>
                </div>
              </div>

              <div class="mt-8 grid gap-6 border-t border-line pt-8 md:grid-cols-[0.85fr_1.15fr] md:items-start">
                <div>
                  <p class="font-mono text-xs font-medium uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--concept-accent)_80%,black)]">Points à décider</p>
                  <h3 class="mt-3 text-xl font-semibold text-ink">Avant de choisir un second lien</h3>
                </div>
                <ul class="space-y-3">
                  <li v-for="checkpoint in item.detail.checkpoints" :key="checkpoint" class="flex gap-3 text-sm leading-relaxed text-ink-secondary sm:text-base">
                    <span class="mt-0.5 font-semibold text-[color-mix(in_srgb,var(--concept-accent)_80%,black)]" aria-hidden="true">✓</span>
                    <span>{{ checkpoint }}</span>
                  </li>
                </ul>
              </div>

              <blockquote class="mt-8 rounded-2xl bg-night px-6 py-6 text-base leading-relaxed font-medium text-white sm:px-8 sm:text-lg">
                « {{ item.detail.callout }} »
              </blockquote>

              <div class="mt-8 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
                <p class="max-w-lg text-sm leading-relaxed text-ink-secondary">Cette fiche présente le principe. Le choix des opérateurs, des liens et du mode de bascule dépend ensuite de vos usages réels.</p>
                <a href="/contact" class="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[color-mix(in_srgb,var(--concept-accent)_80%,black)] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--concept-accent)]">
                  Parler de votre architecture <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
    </div>
  </dialog>
</template>

<style scoped>
.concept-detail-panel {
  position: fixed;
  left: var(--panel-left);
  top: var(--panel-top);
  width: var(--panel-width);
  height: var(--panel-height);
  max-width: none;
  max-height: none;
  margin: 0;
  opacity: 0.22;
  border-radius: 0.75rem;
  transform-origin: top left;
  transform:
    perspective(1600px)
    translate3d(var(--from-x), var(--from-y), 0)
    scale(var(--from-scale-x), var(--from-scale-y))
    rotateX(7deg)
    rotateY(-14deg);
  filter: saturate(0.7);
  transition:
    transform 405ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 225ms ease-out,
    border-radius 405ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 300ms ease-out;
  will-change: transform, opacity;
}

.concept-detail-panel::backdrop {
  background: rgb(10 26 51 / 0.08);
}

.concept-detail-panel[data-expanded='true'] {
  opacity: 1;
  border-radius: 1.25rem;
  transform: perspective(1600px) translate3d(0, 0, 0) scale(1) rotateX(0) rotateY(0);
  filter: saturate(1);
}

@media (prefers-reduced-motion: reduce) {
  .concept-detail-panel {
    transition-duration: 0.01ms;
  }

  .concept-detail-panel {
    transform: translateY(0.75rem);
  }

  .concept-detail-panel[data-expanded='true'] {
    transform: none;
  }
}
</style>
