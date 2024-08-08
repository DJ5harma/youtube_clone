import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export const public_cloudname = "dkoh3aq60";

export const croppedAvatarUrl = (public_id: string) =>
	public_id
		? `https://res.cloudinary.com/${public_cloudname}/image/upload/c_crop,w_300,h_300/${public_id}.jpg`
		: "/profile.png";

export const getSeekbarTime = (time: number): string => {
	const hours = time / 3600;
	time = time % 3600;
	const minutes = time / 60;
	time = time % 60;
	const seconds = time;
	return `${hours > 1 ? hours + ":" : ""}${minutes.toFixed(0)}:${
		`${seconds < 10 ? "0" : ""}` + seconds.toFixed(0)
	}`;
};
export const timeSince = (date: Date): string => {
	const now = new Date();
	const secondsPast = Math.floor((now.getTime() - date.getTime()) / 1000);

	if (secondsPast < 60) {
		return "just now";
		// if (secondsPast === 1) return `${secondsPast} second ago`;
		// return `${secondsPast} seconds ago`;
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
};

export const convertToHumanFriendlyDate = (dateObj: Date) => {
	// const dateObj = new Date(dateStr);
	const humanFriendlyDate = dateObj.toLocaleString("en-US", {
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
		day: "2-digit",
		month: "long",
		year: "numeric",
	});

	return humanFriendlyDate;
};
