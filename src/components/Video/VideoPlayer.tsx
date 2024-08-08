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
	}, [video]);

	return (
		<div className="items-start gap-1 flex-col" ref={fullscreenContainer}>
			<video
				className={`rounded-lg cursor-pointer aspect-video`}
				onClick={togglePlay}
				playsInline
				autoPlay
				loop
				ref={videoRef}
				src={
					// "/sampleVideo.mp4"
					video.video.secure_url
				}
				onMouseMove={() => setHideControlsTimer(4)}
				onTimeUpdate={() => {
					if (videoRef.current) videoRef.current.muted = false;
					setCurrentTime(videoRef.current?.currentTime || 0);
					if (hideControlsTimer > 0)
						setHideControlsTimer(hideControlsTimer - 1);
				}}
				onDoubleClick={toggleFullscreen}
			>
				<source />
				video tag not supported on this browser
			</video>
			{videoRef.current ? (
				<div
					className={`relative lg:bottom-16 lg:-mb-16 ${
						!hideControlsTimer ? "lg:hidden" : ""
					}`}
					onMouseLeave={() => setHideControlsTimer(0)}
					onMouseMove={() => setHideControlsTimer(4)}
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
			) : (
				<></>
			)}
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
	);
}
