import { getSeekbarTime } from "@/lib/utils";
import React, { RefObject, useEffect, useRef } from "react";

const Time = ({ videoRef }: { videoRef: RefObject<HTMLVideoElement> }) => {
	const CurrTimeRef = useRef<HTMLParagraphElement>(null);
	const DurationRef = useRef<HTMLParagraphElement>(null);
	useEffect(() => {
		if (typeof window === "undefined") return;
		const video = videoRef.current;
		if (!video) return;
		if (DurationRef.current)
			DurationRef.current.textContent = getSeekbarTime(video.duration);
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
		<div className="text-xs gap-1 ml-1 flex items-center">
			<p ref={CurrTimeRef}>
				{getSeekbarTime(videoRef.current?.currentTime || 0)}
			</p>
			<p>/</p>
			<p ref={DurationRef}></p>
		</div>
	);
};

export default Time;
