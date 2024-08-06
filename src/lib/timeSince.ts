export default function timeSince(date: Date): string {
	const now = new Date();
	const secondsPast = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (secondsPast < 60) {
		if (secondsPast === 1) return `${secondsPast} second ago`;
		return `${secondsPast} seconds ago`;
	}
	const minutesPast = Math.floor(secondsPast / 60);
	if (minutesPast < 60) {
		if (minutesPast === 1) return `${minutesPast} minute ago`;
		return `${minutesPast} minutes ago`;
	}
	const hoursPast = Math.floor(minutesPast / 60);
	if (hoursPast < 24) {
		if (hoursPast === 1) return `${hoursPast} hour ago`;
		return `${hoursPast} hours ago`;
	}
	const daysPast = Math.floor(hoursPast / 24);
	if (daysPast < 30) {
		if (daysPast === 1) return `${daysPast} day ago`;
		return `${daysPast} days ago`;
	}
	const monthsPast = Math.floor(daysPast / 30);
	if (monthsPast < 12) {
		if (monthsPast === 1) return `${monthsPast} month ago`;
		return `${monthsPast} months ago`;
	}
	const yearsPast = Math.floor(monthsPast / 12);
	if (yearsPast === 1) return `${yearsPast} year ago`;
	return `${yearsPast} years ago`;
}