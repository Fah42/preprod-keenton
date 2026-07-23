const DAY_IN_MS = 24 * 60 * 60 * 1000;

function addUtcMonths(date, months) {
	const result = new Date(date.getTime());
	result.setUTCMonth(result.getUTCMonth() + months);
	return result;
}

function addUtcYears(date, years) {
	const result = new Date(date.getTime());
	result.setUTCFullYear(result.getUTCFullYear() + years);
	return result;
}

export function getElapsedTimeParts(startValue, endValue = new Date()) {
	const start = new Date(startValue);
	const end = new Date(endValue);

	if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
		return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
	}

	let years = end.getUTCFullYear() - start.getUTCFullYear();
	let cursor = addUtcYears(start, years);
	if (cursor > end) {
		years -= 1;
		cursor = addUtcYears(start, years);
	}

	let months = (end.getUTCFullYear() - cursor.getUTCFullYear()) * 12 + end.getUTCMonth() - cursor.getUTCMonth();
	let monthCursor = addUtcMonths(cursor, months);
	if (monthCursor > end) {
		months -= 1;
		monthCursor = addUtcMonths(cursor, months);
	}

	let remainingMilliseconds = end.getTime() - monthCursor.getTime();
	const days = Math.floor(remainingMilliseconds / DAY_IN_MS);
	remainingMilliseconds -= days * DAY_IN_MS;
	const hours = Math.floor(remainingMilliseconds / (60 * 60 * 1000));
	remainingMilliseconds -= hours * 60 * 60 * 1000;
	const minutes = Math.floor(remainingMilliseconds / (60 * 1000));
	remainingMilliseconds -= minutes * 60 * 1000;
	const seconds = Math.floor(remainingMilliseconds / 1000);

	return { years, months, days, hours, minutes, seconds };
}

export function formatElapsedDate({ years, months, days }) {
	const yearLabel = years === 1 ? 'an' : 'ans';
	const monthLabel = months === 1 ? 'mois' : 'mois';
	const dayLabel = days === 1 ? 'jour' : 'jours';
	return `${years} ${yearLabel} · ${months} ${monthLabel} · ${days} ${dayLabel}`;
}

export function formatElapsedClock({ hours, minutes, seconds }) {
	return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
}
