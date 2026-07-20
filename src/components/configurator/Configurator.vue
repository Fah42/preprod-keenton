<script setup>
import { computed } from 'vue';
import StepIndicator from './StepIndicator.vue';
import StepBesoin from './StepBesoin.vue';
import StepDimensionnement from './StepDimensionnement.vue';
import StepProtections from './StepProtections.vue';
import StepEstimation from './StepEstimation.vue';
import HelpTooltip from '../ui/HelpTooltip.vue';
import { useConfiguratorState } from '../../composables/useConfiguratorState.js';
import { services } from '../../data/configurator/offer.js';

const { state, shareUrl, updateCompany, toggleService, updateProtection, goToStep } = useConfiguratorState();
const selectedServices = computed(() => services.filter((service) => state.services.includes(service.slug)));
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_16px_50px_rgb(10_16_27/0.08)]">
    <StepIndicator :current="state.step" @navigate="goToStep" />
    <div class="grid lg:grid-cols-[1fr_18rem]">
      <div class="p-6 md:p-10">
        <StepBesoin v-if="state.step === 1" :company="state.company" @update="updateCompany" @next="goToStep(2)" />
        <StepDimensionnement v-else-if="state.step === 2" :selected="state.services" @toggle="toggleService" @back="goToStep(1)" @next="goToStep(3)" />
        <StepProtections v-else-if="state.step === 3" :security="state.security" :supervision="state.supervision" @update="updateProtection" @back="goToStep(2)" @next="goToStep(4)" />
        <StepEstimation v-else :configuration="state" :share-url="shareUrl" @back="goToStep(3)" />
      </div>

      <aside class="border-t border-line bg-surface-alt p-6 lg:border-t-0 lg:border-l">
        <div class="flex items-center gap-2">
          <p class="font-mono text-xs uppercase tracking-[0.18em] text-accent-dark">Votre périmètre</p>
          <HelpTooltip text="Ce récapitulatif évolue avec vos choix. Il prépare le brief transmis à l’équipe Keenton." label="Aide sur le récapitulatif du périmètre" />
        </div>
        <div class="mt-6 rounded-lg border border-line bg-surface p-4">
          <p class="text-sm font-semibold text-ink">Socle infrastructure</p>
          <p class="mt-1 text-xs leading-relaxed text-ink-secondary">Cadrage, parc, réseau et documentation de l’existant.</p>
        </div>
        <div class="mt-3 space-y-2">
          <div v-for="service in selectedServices" :key="service.slug" class="rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink">{{ service.label }}</div>
        </div>
        <div class="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-ink-secondary">Le configurateur prépare un brief. Aucun tarif n’est affiché avant validation technique du périmètre.</div>
      </aside>
    </div>
  </div>
</template>
