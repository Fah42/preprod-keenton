<script setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue';
import Icon from '../ui/Icon.vue';

const props = defineProps({
  item: { type: Object, required: true },
  instanceKey: { type: String, required: true },
});

const card = ref(null);
const triggerButton = ref(null);
const panel = ref(null);
const closeButton = ref(null);
const isExpanded = ref(false);
const accent = ref('#388E3C');
const geometry = ref({ left: 0, top: 0, width: 0, height: 0, fromX: 0, fromY: 0, scaleX: 1, scaleY: 1 });
const dialogId = computed(() => `compact-concept-dialog-${props.instanceKey}`);
const titleId = computed(() => `compact-concept-title-${props.instanceKey}`);
const detailSize = computed(() => props.item.compactDetail?.size ?? 'default');
const detailEffect = computed(() => props.item.compactDetail?.effect ?? 'page');
const isMini = computed(() => detailSize.value === 'mini');
const isMicro = computed(() => detailSize.value === 'micro');
const isTooltipEffect = computed(() => detailEffect.value === 'tooltip');

let closeTimer;
let hoverCloseTimer;
let reducedMotion = false;

const panelStyle = computed(() => ({
  '--compact-accent': accent.value,
  '--panel-left': `${geometry.value.left}px`,
  '--panel-top': `${geometry.value.top}px`,
  '--panel-width': `${geometry.value.width}px`,
  '--panel-height': `${geometry.value.height}px`,
  '--from-x': `${geometry.value.fromX}px`,
  '--from-y': `${geometry.value.fromY}px`,
  '--from-scale-x': geometry.value.scaleX,
  '--from-scale-y': geometry.value.scaleY,
}));

function updateGeometry() {
  if (!card.value) return;

  const source = isTooltipEffect.value && triggerButton.value
    ? triggerButton.value.getBoundingClientRect()
    : card.value.getBoundingClientRect();
  const mobile = window.innerWidth < 640;
  const margin = isTooltipEffect.value ? 16 : mobile ? 12 : 28;
  const gap = 10;
  const desktopWidth = isMicro.value ? 360 : isMini.value ? 440 : 520;
  const desktopWidthRatio = isMicro.value ? 0.32 : isMini.value ? 0.38 : 0.44;
  const desktopHeight = isMicro.value ? 250 : isMini.value ? 350 : 380;
  const mobileHeight = isMicro.value ? 310 : isMini.value ? 400 : 420;
  const width = mobile
    ? window.innerWidth - margin * 2
    : Math.min(desktopWidth, Math.round(window.innerWidth * desktopWidthRatio));
  const height = mobile
    ? Math.min(mobileHeight, window.innerHeight - margin * 2)
    : Math.min(desktopHeight, window.innerHeight - 72);
  const centeredLeft = isTooltipEffect.value
    ? source.left + source.width / 2 - width / 2
    : (window.innerWidth - width) / 2;
  const left = Math.round(Math.min(Math.max(centeredLeft, margin), window.innerWidth - width - margin));
  const topAbove = source.top - height - gap;
  const anchoredTop = topAbove >= margin ? topAbove : source.bottom + gap;
  const top = isTooltipEffect.value
    ? Math.round(Math.min(Math.max(anchoredTop, margin), window.innerHeight - height - margin))
    : Math.max(margin, Math.round((window.innerHeight - height) / 2));

  geometry.value = {
    left,
    top,
    width,
    height,
    fromX: source.left - left,
    fromY: source.top - top,
    scaleX: Math.max(0.12, source.width / width),
    scaleY: Math.max(0.12, source.height / height),
  };
}

async function open() {
  window.clearTimeout(hoverCloseTimer);
  if (panel.value?.open) {
    if (!isExpanded.value) {
      window.clearTimeout(closeTimer);
      isExpanded.value = true;
    }
    return;
  }

  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  accent.value = getComputedStyle(card.value).getPropertyValue('--cat-accent').trim() || '#388E3C';
  updateGeometry();
  isExpanded.value = false;
  if (isTooltipEffect.value) panel.value.show();
  else panel.value.showModal();

  await nextTick();
  window.addEventListener('resize', updateGeometry);
  if (isTooltipEffect.value) window.addEventListener('scroll', updateGeometry, true);
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      if (!panel.value?.open) return;
      isExpanded.value = true;
      if (!isTooltipEffect.value) closeButton.value?.focus();
    });
  });
}

function cancelTooltipClose() {
  window.clearTimeout(hoverCloseTimer);
}

function scheduleTooltipClose() {
  if (!isTooltipEffect.value) return;
  window.clearTimeout(hoverCloseTimer);
  hoverCloseTimer = window.setTimeout(close, 100);
}

function finishClose() {
  if (isExpanded.value) return;

  window.clearTimeout(closeTimer);
  panel.value?.close();
  window.removeEventListener('resize', updateGeometry);
  window.removeEventListener('scroll', updateGeometry, true);
  if (!isTooltipEffect.value) nextTick(() => triggerButton.value?.focus());
}

function close() {
  if (!panel.value?.open) return;
  if (!isExpanded.value) {
    finishClose();
    return;
  }

  updateGeometry();
  isExpanded.value = false;
  closeTimer = window.setTimeout(finishClose, reducedMotion ? 20 : isTooltipEffect.value ? 170 : 420);
}

function handleTransitionEnd(event) {
  if (event.target === panel.value && event.propertyName === 'transform' && !isExpanded.value) {
    finishClose();
  }
}

onBeforeUnmount(() => {
  window.clearTimeout(closeTimer);
  window.clearTimeout(hoverCloseTimer);
  if (panel.value?.open) panel.value.close();
  window.removeEventListener('resize', updateGeometry);
  window.removeEventListener('scroll', updateGeometry, true);
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
    <p class="mt-2 grow text-base leading-relaxed text-ink-secondary">{{ item.text }}</p>
    <button
      ref="triggerButton"
      type="button"
      data-compact-trigger
      class="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[color-mix(in_srgb,var(--cat-accent)_10%,white)] px-4 py-2 text-sm font-semibold text-[color-mix(in_srgb,var(--cat-accent)_80%,black)] transition-[gap,background-color] hover:gap-3 hover:bg-[color-mix(in_srgb,var(--cat-accent)_16%,white)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--cat-accent)]"
      :aria-expanded="isExpanded"
      :aria-controls="dialogId"
      aria-haspopup="dialog"
      @click="open"
      @mouseenter="isTooltipEffect && open()"
      @mouseleave="scheduleTooltipClose"
      @focus="isTooltipEffect && open()"
      @blur="scheduleTooltipClose"
      @keydown.esc="close"
    >
      En savoir plus
      <span aria-hidden="true">→</span>
    </button>
  </article>

  <dialog
    :id="dialogId"
    ref="panel"
    class="compact-concept-panel overflow-hidden border border-[color-mix(in_srgb,var(--compact-accent)_45%,white)] bg-white p-0 text-ink shadow-[0_34px_90px_rgb(10_26_51/0.28)]"
    :data-expanded="isExpanded"
    :data-size="detailSize"
    :data-effect="detailEffect"
    :style="panelStyle"
    :aria-labelledby="titleId"
    @cancel.prevent="close"
    @click.self="close"
    @mouseenter="cancelTooltipClose"
    @mouseleave="scheduleTooltipClose"
    @keydown.esc="close"
    @transitionend="handleTransitionEnd"
  >
    <div class="flex h-full min-h-0 flex-col">
      <div
        :class="[
          'flex shrink-0 items-center border-b border-line bg-surface-alt',
          isMicro ? 'h-11 gap-3 px-3.5 sm:px-4' : 'h-12 gap-4 px-4 sm:px-5',
        ]"
      >
          <img src="/images/logo-keenton.png" alt="Keenton" width="240" height="240" class="h-5 w-5 shrink-0 object-contain sm:h-6 sm:w-6" />
          <p class="min-w-0 flex-1 truncate text-center font-mono text-[0.65rem] tracking-[0.08em] text-ink-secondary sm:text-xs">
            expertise.keenton / fiche technique / {{ item.title.toLowerCase() }}
          </p>
          <button
            ref="closeButton"
            type="button"
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-[var(--compact-accent)] hover:text-[var(--compact-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--compact-accent)]"
            :aria-label="`Fermer la fiche sur ${item.title}`"
            @click="close"
          >
            <svg class="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4l12 12M16 4 4 16" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
            </svg>
          </button>
      </div>

      <div
        :class="[
          'min-h-0 flex-1 overflow-hidden',
          isMicro ? 'px-5 py-3.5' : isMini ? 'px-5 py-4 sm:px-6' : 'px-6 py-6 sm:px-8',
        ]"
      >
        <p
          :class="[
            'font-mono font-medium uppercase text-[color-mix(in_srgb,var(--compact-accent)_80%,black)]',
            isMicro ? 'text-[0.6rem] tracking-[0.16em]' : 'text-[0.65rem] tracking-[0.2em] sm:text-xs',
          ]"
        >
          {{ item.compactDetail.eyebrow }}
        </p>
        <h2
          :id="titleId"
          :class="[
            'font-semibold leading-tight text-ink',
            isMicro ? 'mt-1 text-xl' : isMini ? 'mt-1.5 text-xl sm:text-2xl' : 'mt-2 text-2xl sm:text-3xl',
          ]"
        >
          {{ item.compactDetail.title }}
        </h2>
        <p
          :class="[
            'text-sm leading-relaxed text-ink-secondary',
            isMicro ? 'mt-2 text-xs' : isMini ? 'mt-3' : 'mt-4 sm:text-base',
          ]"
        >
          {{ item.compactDetail.introduction }}
        </p>

        <dl
          :class="[
            'grid',
            isMicro ? 'mt-2 grid-cols-3 gap-1.5' : isMini ? 'mt-3 gap-2 sm:grid-cols-3' : 'mt-5 gap-2.5 sm:grid-cols-3',
          ]"
        >
          <div
            v-for="fact in item.compactDetail.facts"
            :key="fact.label"
            :class="[
              'rounded-xl border border-[color-mix(in_srgb,var(--compact-accent)_20%,var(--color-line))] bg-[color-mix(in_srgb,var(--compact-accent)_5%,white)]',
              isMicro ? 'px-2 py-2' : isMini ? 'px-3 py-2.5' : 'px-3.5 py-3',
            ]"
          >
            <dt
              :class="[
                'font-mono font-medium uppercase text-[color-mix(in_srgb,var(--compact-accent)_78%,black)]',
                isMicro ? 'text-[0.52rem] tracking-[0.08em]' : 'text-[0.62rem] tracking-[0.12em]',
              ]"
            >{{ fact.label }}</dt>
            <dd
              :class="[
                'font-semibold leading-snug text-ink',
                isMicro ? 'mt-0.5 text-[0.68rem]' : isMini ? 'mt-1 text-xs' : 'mt-1.5 text-sm',
              ]"
            >{{ fact.value }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.compact-concept-panel {
  position: fixed;
  z-index: 100;
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
    transform 540ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 300ms ease,
    border-radius 540ms cubic-bezier(0.16, 1, 0.3, 1),
    filter 400ms ease;
  will-change: transform, opacity;
}

.compact-concept-panel::backdrop {
  background: rgb(10 26 51 / 0.08);
}

.compact-concept-panel[data-expanded='true'] {
  opacity: 1;
  border-radius: 1.25rem;
  transform: perspective(1600px) translate3d(0, 0, 0) scale(1) rotateX(0) rotateY(0);
  filter: saturate(1);
}

.compact-concept-panel[data-effect='tooltip'] {
  opacity: 0;
  border-radius: 1.25rem;
  transform: translate3d(0, 0.25rem, 0);
  filter: none;
  transition:
    transform 150ms ease-out,
    opacity 150ms ease-out;
}

.compact-concept-panel[data-effect='tooltip']::backdrop {
  background: transparent;
}

.compact-concept-panel[data-effect='tooltip'][data-expanded='true'] {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  filter: none;
}

@media (prefers-reduced-motion: reduce) {
  .compact-concept-panel {
    transition-duration: 0.01ms;
    transform: translateY(0.5rem);
  }

  .compact-concept-panel[data-expanded='true'] {
    transform: none;
  }
}
</style>
