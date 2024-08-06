export default function convertToMinsSecs(time: number): string {
	const hours = time / 3600;
	time = time % 3600;
	const minutes = time / 60;
	time = time % 60;
	const seconds = time;
	return `${hours > 1 ? hours + ":" : ""}${minutes.toFixed(0)}:${
		`${seconds < 10 ? "0" : ""}` + seconds.toFixed(0)
	}`;
}
