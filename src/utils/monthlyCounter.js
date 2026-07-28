export function getMonthlyProgressValue(targetValue, currentDate = new Date()) {
	const target = Math.max(0, Number(targetValue) || 0);
	const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
	const nextMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
	const monthDuration = nextMonthStart.getTime() - monthStart.getTime();
	const elapsed = Math.min(
		Math.max(currentDate.getTime() - monthStart.getTime(), 0),
		monthDuration,
	);

	if (monthDuration <= 0 || target === 0) return 0;

	return Math.min(target, Math.round((elapsed / monthDuration) * target));
}

export function formatLiters(value) {
	const roundedValue = Math.max(0, Math.round(Number(value) || 0));
	return `${roundedValue.toLocaleString('fr-FR')} ${roundedValue === 1 ? 'litre' : 'litres'}`;
}
