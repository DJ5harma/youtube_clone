"use client";
import React, { useEffect, useRef, useState } from "react";
import ControlButtons from "./ControlButtons";
import Image from "next/image";
import { croppedAvatarUrl } from "@/lib/utils";
import SubscribeSection from "../SubscribeSection";

export default function VideoPlayer({
	video,
}: {
	video: {
		_id: string;
		title: string;
		creator: {
			username: string;
			_id: string;
			avatar: {
				secure_url: string;
				public_id: string;
			};
			subscribers: number;
		};
		thumbnail: {
			secure_url: string;
			public_id: string;
		};
		video: {
			secure_url: string;
			public_id: string;
		};
		views: string;
		createdAt: Date;
		likes: number;
		dislikes: number;
	};
}) {
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
	// useEffect(() => {
	// 	if (videoRef.current) {
	// 		videoRef.current.src = "/sampleVideo.mp4";
	// 		// video.video.secure_url;
	// 		videoRef.current.load();
	// 		setPaused(false);
	// 	}
	// }, [video]);
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
			className="items-start gap-1 flex-col sm:w-7/12"
			ref={fullscreenContainer}
			onMouseMove={() => setHideControlsTimer(4)}
			onMouseLeave={() => setHideControlsTimer(0)}
		>
			<video
				className={`rounded-xl cursor-pointer`}
				onClick={togglePlay}
				playsInline
				autoPlay
				loop
				ref={videoRef}
				muted
				src={
					// "/sampleVideo.mp4"
					video.video.secure_url
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
			{(hideControlsTimer > 0 || paused) && (
				<ControlButtons
					currentTime={currentTime}
					fullscreen={fullscreen}
					paused={paused}
					toggleFullscreen={toggleFullscreen}
					togglePlay={togglePlay}
					handleSeek={handleSeek}
					videoRef={videoRef}
				/>
			)}
			<div
				className={`pt-2 px-1 flex flex-col gap-2 w-full border ${
					hideControlsTimer > 0 || paused ? "relative bottom-16" : ""
				}`}
			>
				<p
					className={`text-2xl font-semibold ${
						fullscreen && (hideControlsTimer > 0 || paused)
							? "fixed top-4 left-4 z-50"
							: ""
					}`}
				>
					{video.title}
				</p>
				<div className="flex w-full border">
					<SubscribeSection creator={video.creator} />
				</div>
			</div>
		</div>
	);
}
