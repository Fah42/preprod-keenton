import { reactive, ref, onMounted, onUnmounted } from 'vue';
import { services } from '../data/configurator/offer.js';

const SYNC_DEBOUNCE_MS = 250;

export function useConfiguratorState() {
	const state = reactive({
		step: 1,
		company: { size: '', sites: '', sector: '' },
		services: [],
		security: 'none',
		supervision: 'none',
	});

	const shareUrl = ref('');
	let syncTimeout = null;

	function readFromUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams(window.location.search);
		state.company.size = params.get('size') ?? '';
		state.company.sites = params.get('sites') ?? '';
		state.company.sector = params.get('sector') ?? '';
		state.services = (params.get('services') ?? '').split(',').filter((slug) => services.some((service) => service.slug === slug));
		state.security = params.get('security') ?? 'none';
		state.supervision = params.get('supervision') ?? 'none';
		state.step = Math.min(4, Math.max(1, Number(params.get('step')) || 1));
		shareUrl.value = window.location.href;
	}

	function writeToUrl() {
		if (typeof window === 'undefined') return;
		const params = new URLSearchParams();
		params.set('step', String(state.step));
		for (const [key, value] of Object.entries(state.company)) if (value) params.set(key, value);
		if (state.services.length) params.set('services', state.services.join(','));
		if (state.security !== 'none') params.set('security', state.security);
		if (state.supervision !== 'none') params.set('supervision', state.supervision);

		const query = params.toString();
		const url = query ? `${window.location.pathname}?${query}` : window.location.pathname;
		window.history.replaceState(null, '', url);
		shareUrl.value = window.location.href;
	}

	function scheduleSync() {
		if (syncTimeout) clearTimeout(syncTimeout);
		syncTimeout = setTimeout(writeToUrl, SYNC_DEBOUNCE_MS);
	}

	function updateCompany(key, value) {
		state.company[key] = value;
		scheduleSync();
	}

	function toggleService(slug) {
		state.services = state.services.includes(slug)
			? state.services.filter((item) => item !== slug)
			: [...state.services, slug];
		scheduleSync();
	}

	function updateProtection(key, value) { state[key] = value; scheduleSync(); }

	function goToStep(step) {
		state.step = step;
		scheduleSync();
	}

	function onPopState() {
		readFromUrl();
	}

	onMounted(() => {
		readFromUrl();
		window.addEventListener('popstate', onPopState);
	});

	onUnmounted(() => {
		window.removeEventListener('popstate', onPopState);
		if (syncTimeout) clearTimeout(syncTimeout);
	});

	return {
		state,
		shareUrl,
		updateCompany,
		toggleService,
		updateProtection,
		goToStep,
	};
}
