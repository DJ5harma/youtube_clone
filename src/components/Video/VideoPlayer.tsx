"use client";
import React from "react";
import ControlButtons from "./ControlButtons";

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
	const videoRef = React.useRef<HTMLVideoElement>(null);
	const fullscreenContainer = React.useRef<HTMLDivElement>(null);

	const [paused, setPaused] = React.useState(false);
	const [fullscreen, setFullscreen] = React.useState(false);

	const [currentTime, setCurrentTime] = React.useState<number>(
		videoRef.current?.currentTime || 0
	);

	const [hideControlsTimer, setHideControlsTimer] = React.useState(20);

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

	function toggleFullscreen() {
		setFullscreen(!fullscreen);
		if (!fullscreen) fullscreenContainer.current?.requestFullscreen();
		else document.exitFullscreen();
	}
	function handleSeek(val: number) {
		if (!videoRef.current) return;
		videoRef.current.currentTime = val;
		setCurrentTime(val);
	}
	React.useEffect(() => {
		if (videoRef.current) {
			videoRef.current.src = video.video.secure_url;
			videoRef.current.load();
			setPaused(false);
		}
	}, [video]);

	return (
		<div
			className="items-start gap-1 flex-col overflow-hidden w-full sm:w-1/2"
			ref={fullscreenContainer}
			onMouseMove={() => setHideControlsTimer(7)}
			onMouseLeave={() => setHideControlsTimer(0)}
		>
			<video
				className={`rounded-xl cursor-pointer ${
					hideControlsTimer && fullscreen ? "opacity-60" : ""
				}`}
				onClick={togglePlay}
				playsInline
				autoPlay
				loop
				ref={videoRef}
				onTimeUpdate={() => {
					setCurrentTime(videoRef.current?.currentTime || 0);
					if (hideControlsTimer > 0)
						setHideControlsTimer(hideControlsTimer - 1);
					console.log(videoRef.current?.currentTime);
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
		</div>
	);
}
