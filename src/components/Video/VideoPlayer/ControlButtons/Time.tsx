import { getSeekbarTime } from "@/lib/utils";
import React, { RefObject, useEffect, useRef } from "react";

const Time = ({ videoRef }: { videoRef: RefObject<HTMLVideoElement> }) => {
	const CurrTimeRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;
		const handleTimeUpdate = () => {
			if (CurrTimeRef.current)
				CurrTimeRef.current.textContent = getSeekbarTime(video.currentTime);
		};
		video.addEventListener("timeupdate", handleTimeUpdate);
		return () => {
			video.removeEventListener("timeupdate", handleTimeUpdate);
		};
	}, [videoRef]);
	return (
		<div className="text-xs gap-1 ml-3 flex">
			<p ref={CurrTimeRef}>
				{getSeekbarTime(videoRef.current?.currentTime || 0)}
			</p>
			<p>/</p>
			<p>{getSeekbarTime(videoRef.current?.duration || 0)}</p>
		</div>
	);
};

export default Time;
