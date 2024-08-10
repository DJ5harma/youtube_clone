"use client";
import React, { RefObject, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const SeekBar = ({ videoRef }: { videoRef: RefObject<HTMLVideoElement> }) => {
	const [currentTime, setCurrentTime] = useState(0);
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;
		const handleTimeUpdate = () => {
			setCurrentTime(video.currentTime / video.duration);
		};
		video.addEventListener("timeupdate", handleTimeUpdate);
		return () => {
			video.removeEventListener("timeupdate", handleTimeUpdate);
		};
	}, [videoRef]);

	return (
		<div
			className="z-10 backdrop-blur-lg bg-black bg-opacity-75 flex items-end px-3 pt-2 sm:py-2 sm:-my-[2px]"
			onClick={(e) => e.stopPropagation()}
		>
			<input
				type="range"
				min={0}
				max={1}
				value={currentTime}
				step="0.000001"
				className="h-1 sm:h-1.5 w-full cursor-pointer"
				onChange={(e) => {
					if (!videoRef.current) return;
					videoRef.current.currentTime =
						e.target.valueAsNumber * videoRef.current.duration;
					setCurrentTime(e.target.valueAsNumber);
					toast.dismiss();
					toast.success(
						"Seeked to " + (e.target.valueAsNumber * 100).toFixed(0) + " %",
						{
							duration: 1000,
						}
					);
				}}
			/>
		</div>
	);
};

export default SeekBar;
