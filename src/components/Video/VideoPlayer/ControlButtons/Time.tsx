import { getSeekbarTime } from "@/lib/utils";
import React, { RefObject, useEffect, useRef } from "react";

const Time = ({
	videoRef,
	duration,
}: {
	videoRef: RefObject<HTMLVideoElement>;
	duration: number;
}) => {
	const CurrTimeRef = useRef<HTMLParagraphElement>(null);
	useEffect(() => {
		if (typeof window === "undefined") return;
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
		<div className="text-xs gap-1 ml-1 flex items-center">
			<p ref={CurrTimeRef}>
				{getSeekbarTime(videoRef.current?.currentTime || 0)}
			</p>
			<p>/ {getSeekbarTime(duration)}</p>
		</div>
	);
};

export default Time;
