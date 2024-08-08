"use client";
import React, { useEffect, useRef, useState } from "react";
import ControlButtons from "./ControlButtons";
import { CVideoPlayable } from "@/lib/types";
import MobileControlButtons from "./MobileControlButtons";
import { FaBackward, FaForward } from "react-icons/fa";
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
		setHideControlsTimer(10);
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
			<div
				className="relative"
				onMouseLeave={() => setHideControlsTimer(0)}
				onMouseMove={() => setHideControlsTimer(4)}
			>
				<video
					className="rounded-lg cursor-pointer aspect-video"
					playsInline
					autoPlay
					loop
					ref={videoRef}
					src={
						"/sampleVideo.mp4"
						// video.video.secure_url
					}
					onTimeUpdate={() => {
						if (videoRef.current) videoRef.current.muted = false;
						setCurrentTime(videoRef.current?.currentTime || 0);
						if (hideControlsTimer > 0)
							setHideControlsTimer(hideControlsTimer - 1);
					}}
				>
					<source />
					video tag not supported on this browser
				</video>
				{hideControlsTimer !== 0 && (
					<div className="h-full w-full top-0 left-0 absolute flex justify-around items-center [&>div]:flex [&>div]:items-center [&>div]:gap-2 [&>div]:z-30 [&>div]:opacity-80 bg-black bg-opacity-20">
						<div
							onClick={() => {
								if (videoRef.current && videoRef.current.currentTime - 5 >= 0)
									handleSeek(videoRef.current.currentTime - 5);
							}}
						>
							5s
							<FaBackward size={40} />
						</div>
						<div
							onClick={() => {
								if (
									videoRef.current &&
									videoRef.current.currentTime + 5 <= videoRef.current.duration
								)
									handleSeek(videoRef.current.currentTime + 5);
							}}
						>
							<FaForward size={40} />
							5s
						</div>
					</div>
				)}
				<div
					className="lg:hidden h-full w-full top-0 left-0 absolute flex items-end z-20"
					// style={{ height: "calc(100% - 64px)" }} //64px is ControlButtons' height
				>
					<MobileControlButtons
						paused={paused}
						togglePlay={togglePlay}
						handleSeek={handleSeek}
						videoRef={videoRef}
						hideControlsTimer={hideControlsTimer}
						setHideControlsTimer={setHideControlsTimer}
					/>
				</div>

				<div
					className="h-full w-full top-0 left-0 absolute flex items-end"
					onDoubleClick={toggleFullscreen}
					onClick={togglePlay}
				>
					<ControlButtons
						currentTime={currentTime}
						fullscreen={fullscreen}
						paused={paused}
						toggleFullscreen={toggleFullscreen}
						togglePlay={togglePlay}
						handleSeek={handleSeek}
						videoRef={videoRef}
						hideControlsTimer={hideControlsTimer}
					/>
				</div>
			</div>
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
