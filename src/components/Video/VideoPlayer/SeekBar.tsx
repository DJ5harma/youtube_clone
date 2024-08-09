import React, { RefObject, useEffect, useRef } from "react";

const SeekBar = ({ videoRef }: { videoRef: RefObject<HTMLVideoElement> }) => {
	const SeekBarRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;
		const handleTimeUpdate = () => {
			if (SeekBarRef.current)
				SeekBarRef.current.value = (video.currentTime / video.duration).toFixed(
					6
				);
		};
		video.addEventListener("timeupdate", handleTimeUpdate);
		return () => {
			video.removeEventListener("timeupdate", handleTimeUpdate);
		};
	}, [videoRef]);

	return (
		<div className="z-10 backdrop-blur-lg bg-black bg-opacity-75 flex items-end px-3 py-2 -my-[2px]">
			<input
				type="range"
				min={0}
				max={1}
				step="0.000001"
				value={videoRef.current?.currentTime}
				ref={SeekBarRef}
				className="h-1.5 w-full p-0"
				onChange={() => {
					if (videoRef.current && SeekBarRef.current)
						videoRef.current.currentTime =
							videoRef.current.duration * parseFloat(SeekBarRef.current.value);
				}}
			/>
		</div>
	);
};

export default SeekBar;
