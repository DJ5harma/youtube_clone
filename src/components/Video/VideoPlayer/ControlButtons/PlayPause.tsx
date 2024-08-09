import CustomTooltip from "@/components/Nav/CustomTooltip";
import React, { RefObject, useEffect, useState } from "react";
import { BiPause, BiPlay } from "react-icons/bi";

export default function PlayPause({
	videoRef,
	togglePlay,
}: {
	videoRef: RefObject<HTMLVideoElement>;
	togglePlay: () => boolean;
}) {
	const [paused, setPaused] = useState(videoRef.current?.paused);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;
		const handlePlay = () => setPaused(false);
		const handlePause = () => setPaused(true);

		video.addEventListener("play", handlePlay);
		video.addEventListener("pause", handlePause);

		return () => {
			video.removeEventListener("play", handlePlay);
			video.removeEventListener("pause", handlePause);
		};
	}, []);

	return (
		<div onClick={() => setPaused(!togglePlay())}>
			<CustomTooltip
				size={30}
				icon={paused ? <BiPlay /> : <BiPause />}
				text={paused ? "Play" : "Pause"}
			/>
		</div>
	);
}
