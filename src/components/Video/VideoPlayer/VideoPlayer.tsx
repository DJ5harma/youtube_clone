"use client";
import React, { useEffect, useRef } from "react";
import SeekBar from "./SeekBar";
import PlayPause from "./ControlButtons/PlayPause";
import CustomTooltip from "@/components/Nav/CustomTooltip";
import { BiFastForward } from "react-icons/bi";
import Volume from "./ControlButtons/Volume";
import Time from "./ControlButtons/Time";
import { getSrc } from "@/lib/utils";
import { FaBackward, FaForward } from "react-icons/fa";
import FullScreenBtn from "./ControlButtons/FullScreenBtn";
import toast from "react-hot-toast";
import { CVideoPlayable } from "@/lib/types";

export default function VideoPlayer({
	secure_url,
	title,
	duration,
}: {
	secure_url: string;
	title: string;
	duration: number;
}) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const fullscreenContainer = useRef<HTMLDivElement>(null);
	const controlsRef = useRef<HTMLDivElement>(null);
	const mobileControlsRef = useRef<HTMLDivElement>(null);

	const toggleFullscreen = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen();
			return false;
		} else {
			fullscreenContainer.current?.requestFullscreen();
			return true;
		}
	};
	const togglePlay = () => {
		if (videoRef.current?.paused) {
			videoRef.current.play();
			return true;
		} else {
			videoRef.current?.pause();
			return false;
		}
	};
	const seekBy = (seconds: number) => {
		if (!videoRef.current) return;
		if (
			seconds > 0 &&
			videoRef.current?.currentTime + seconds < videoRef.current?.duration
		)
			videoRef.current.currentTime += seconds;
		else if (seconds < 0 && videoRef.current.currentTime - seconds > 0)
			videoRef.current.currentTime += seconds;
	};
	useEffect(() => {
		toast.dismiss();
		toast.success("Video loaded!");
	}, [secure_url]);
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;
		if (typeof window !== "undefined") {
			video.muted = false;
			video.play();
		}
		const handleKeyPress = (e: KeyboardEvent) => {
			if (video && document.activeElement?.tagName !== "INPUT") {
				switch (e.key.toUpperCase()) {
					case "F":
						e.preventDefault();
						toggleFullscreen();
						break;
					case "ARROWRIGHT":
						e.preventDefault();
						seekBy(+5);
						break;
					case "ARROWLEFT":
						e.preventDefault();
						seekBy(-5);
						break;
					case " ":
						e.preventDefault();
						togglePlay();
						break;
					default:
						break;
				}
			}
		};
		document.addEventListener("keydown", handleKeyPress);
		return () => document.removeEventListener("keydown", handleKeyPress);
	}, [videoRef]);

	let lock = false;
	const handleControlsShow = () => {
		if (!controlsRef.current || !videoRef.current) return;
		controlsRef.current.style.opacity = "100%";
		// mobileControlsRef.current &&
		// (mobileControlsRef.current.style.zIndex = "50");
		if (!lock) {
			lock = true;
			setTimeout(
				() => {
					if (
						controlsRef.current &&
						!videoRef.current?.paused &&
						mobileControlsRef.current
					) {
						controlsRef.current.style.opacity = "0";
						// mobileControlsRef.current.style.zIndex = "0";
					}
					lock = false;
				},
				window.innerWidth < 640 ? 1500 : 3000
			);
		}
	};
	const handleHideControls = () => {
		if (controlsRef.current) controlsRef.current.style.opacity = "0";
		// if (mobileControlsRef.current)
		// mobileControlsRef.current.style.zIndex = "0";
	};

	return (
		<div className="items-start gap-1 flex-col">
			<div className="relative flex items-center" ref={fullscreenContainer}>
				<video
					className="rounded-lg cursor-pointer aspect-video w-full"
					playsInline
					autoPlay
					loop
					ref={videoRef}
					src={getSrc(secure_url, "video")}
				>
					<source />
					video tag not supported on this browser
				</video>
				<div
					ref={controlsRef}
					className="absolute justify-end w-full h-full flex flex-col"
					onMouseLeave={handleHideControls}
					onMouseMove={handleControlsShow}
					onMouseEnter={handleControlsShow}
					onClick={handleControlsShow}
				>
					<p className="fixed top-0 left-0 bg-black w-full bg-opacity-45 backdrop-blur-3xl sm:text-2xl font-semibold p-4 -z-50 sm:z-10">
						{title}
					</p>
					<div
						className="w-full h-full hidden sm:flex"
						onClick={() => {
							if (window.innerWidth >= 640) togglePlay();
						}}
						onDoubleClick={() => {
							if (window.innerWidth >= 640) toggleFullscreen();
						}}
					></div>
					<div
						ref={mobileControlsRef}
						className="z-50 flex-1 flex items-center w-full h-full pt-8 sm:hidden [&>*]:select-none"
						style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
						onClick={handleHideControls}
					>
						<div
							onDoubleClick={() => seekBy(-5)}
							className="h-full flex-1 flex justify-center items-center"
						>
							<div
								className="flex items-center gap-2 cursor-pointer"
								onClick={() => lock && seekBy(-5)}
							>
								5s
								<FaBackward />
							</div>
						</div>
						<div className="flex justify-center items-center h-12 w-12 rounded-full bg-black bg-opacity-80">
							<PlayPause
								togglePlay={togglePlay}
								videoRef={videoRef}
								size={40}
							/>
						</div>
						<div
							onDoubleClick={() => seekBy(+5)}
							className="h-full flex-1 flex justify-center items-center"
						>
							<div
								className="flex items-center gap-2 cursor-pointer"
								onClick={() => lock && seekBy(+5)}
							>
								5s
								<FaForward />
							</div>
						</div>
					</div>
					<SeekBar videoRef={videoRef} />
					<div className="h-8 sm:h-12 bg-black text-white items-center flex [&>div]:h-full bg-opacity-75 backdrop-blur-lg pl-1 pr-2">
						<div className="items-center flex w-full sm:gap-2">
							<PlayPause videoRef={videoRef} togglePlay={togglePlay} />
							<CustomTooltip
								size={30}
								icon={<BiFastForward />}
								text="Play next ->"
							/>
							<Volume videoRef={videoRef} />
							<Time videoRef={videoRef} duration={duration} />
						</div>
						<FullScreenBtn toggleFullscreen={toggleFullscreen} />
					</div>
				</div>
			</div>
			<p className="text-xl sm:text-2xl font-semibold p-2">{title}</p>
		</div>
	);
}
