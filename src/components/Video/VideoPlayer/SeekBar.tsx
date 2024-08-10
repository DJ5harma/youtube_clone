import React, { RefObject, useEffect, useRef } from "react";

const SeekBar = ({ videoRef }: { videoRef: RefObject<HTMLVideoElement> }) => {
	const SeekBarRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;
		SeekBarRef.current && (SeekBarRef.current.value = "0");
		const handleTimeUpdate = () => {
			const newVal = (video.currentTime / video.duration).toFixed(6);
			SeekBarRef.current && (SeekBarRef.current.value = newVal);
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
				value={SeekBarRef.current?.value}
				step="0.000001"
				ref={SeekBarRef}
				className="h-1 sm:h-1.5 w-full cursor-pointer"
				onChange={() => {
					videoRef.current &&
						SeekBarRef.current &&
						(videoRef.current.currentTime =
							videoRef.current.duration * parseFloat(SeekBarRef.current.value));
				}}
			/>
		</div>
	);
};

export default SeekBar;
