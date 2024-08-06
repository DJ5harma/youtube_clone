"use client";
import React, { useEffect, useRef, useState } from "react";
import ControlButtons from "./ControlButtons";
import { CVideoPlayable } from "@/lib/types";
export default function VideoPlayer({ video }: { video: CVideoPlayable }) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const fullscreenContainer = useRef<HTMLDivElement>(null);

	const [paused, setPaused] = useState(false);
	const [fullscreen, setFullscreen] = useState(false);

	const [currentTime, setCurrentTime] = useState<number>(
		videoRef.current?.currentTime || 0
	);

	const [hideControlsTimer, setHideControlsTimer] = useState(20);

	function togglePlay() {
		if (!videoRef.current) return;
		if (videoRef.current.paused) {
			videoRef.current.play();
			setPaused(false);
			return;
		}
		videoRef.current.pause();
		setPaused(true);
	}

	function handleSeek(val: number) {
		if (!videoRef.current) return;
		videoRef.current.currentTime = val;
		setCurrentTime(val);
	}

	function toggleFullscreen() {
		if (document.fullscreenElement) {
			setFullscreen(false);
			document.exitFullscreen();
		} else {
			fullscreenContainer.current?.requestFullscreen();
			setFullscreen(true);
		}
	}
	useEffect(() => {
		if (videoRef.current) videoRef.current.muted = false;
		const handleFullscreenChange = () => {
			if (document.fullscreenElement) setFullscreen(true);
			else setFullscreen(false);
		};
		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
		};
	}, []);

	return (
		<div
			className="items-start gap-1 flex-col"
			ref={fullscreenContainer}
			onMouseMove={() => setHideControlsTimer(4)}
			onMouseLeave={() => setHideControlsTimer(0)}
		>
			<video
				className={`rounded-lg cursor-pointer`}
				onClick={togglePlay}
				playsInline
				autoPlay
				loop
				ref={videoRef}
				muted
				src={
					"/sampleVideo.mp4"
					// video.video.secure_url
				}
				onTimeUpdate={() => {
					setCurrentTime(videoRef.current?.currentTime || 0);
					if (hideControlsTimer > 0)
						setHideControlsTimer(hideControlsTimer - 1);
				}}
				onDoubleClick={toggleFullscreen}
			>
				<source />
				video tag not supported on this browser
			</video>
			<div
				className={`relative bottom-16 -mb-16 ${
					hideControlsTimer > 0 || paused ? "" : "opacity-0"
				}`}
			>
				<ControlButtons
					currentTime={currentTime}
					fullscreen={fullscreen}
					paused={paused}
					toggleFullscreen={toggleFullscreen}
					togglePlay={togglePlay}
					handleSeek={handleSeek}
					videoRef={videoRef}
				/>
			</div>
			<div>
				<p
					className={`text-xl sm:text-2xl font-semibold p-2 ${
						fullscreen
							? "fixed top-0 left-0 z-50 bg-black p-2 rounded-ee-xl bg-opacity-50"
							: ""
					}`}
				>
					{video.title}
				</p>
			</div>
		</div>
	);
}
