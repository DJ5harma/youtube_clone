"use client";
import React, { useEffect, useRef, useState } from "react";
import { CVideoPlayable } from "@/lib/types";
import MobileControlButtons from "./MobileControlButtons";
import SeekBar from "./SeekBar";
import PlayPause from "./ControlButtons/PlayPause";
import CustomTooltip from "@/components/Nav/CustomTooltip";
import { BiFastForward } from "react-icons/bi";
import Volume from "./ControlButtons/Volume";
import Time from "./ControlButtons/Time";
import FullScreenBtn from "./ControlButtons/FullScreenBtn";
import { getSrc } from "@/lib/utils";
export default function VideoPlayer({ video }: { video: CVideoPlayable }) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const fullscreenContainer = useRef<HTMLDivElement>(null);

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
			videoRef.current.currentTime -= seconds;
	};

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;
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

	return (
		<div className="items-start gap-1 flex-col">
			<div className="relative flex items-center" ref={fullscreenContainer}>
				<video
					className="rounded-lg cursor-pointer aspect-video w-full"
					playsInline
					autoPlay
					loop
					ref={videoRef}
					src={getSrc(video.video.secure_url, "video")}
				>
					<source />
					video tag not supported on this browser
				</video>
				<div className="absolute justify-end w-full h-full flex flex-col">
					{/* {true && (
						<div className="bg-orange-700 flex-1 h-full w-full">
							<div>
								5s
								<FaBackward />
							</div>
							<div>
								<FaForward />
								5s
							</div>
						</div>
					)} */}
					<div
						className="w-full h-full"
						onClick={togglePlay}
						onDoubleClick={toggleFullscreen}
						// onMouseMove={()=>{}}
					></div>
					{/* <div className="flex sm:hidden flex-1">
						<MobileControlButtons videoRef={videoRef} />
					</div> */}
					<SeekBar videoRef={videoRef} />
					<div className="h-10 md:h-12 w-full bg-black text-white items-center flex [&>div]:h-full justify-between bg-opacity-75 backdrop-blur-lg px-2">
						<div className="items-center flex w-full lg:gap-2">
							<PlayPause videoRef={videoRef} togglePlay={togglePlay} />
							<CustomTooltip
								size={30}
								icon={<BiFastForward />}
								text="Play next ->"
							/>
							<Volume videoRef={videoRef} />
							<Time videoRef={videoRef} />
						</div>
						<FullScreenBtn toggleFullscreen={toggleFullscreen} />
					</div>
				</div>
			</div>
			<p
				className={`text-xl sm:text-2xl font-semibold p-2 ${
					false
						? "fixed top-0 left-0 z-50 bg-black p-2 rounded-ee-xl bg-opacity-50"
						: ""
				}`}
			>
				{video.title}
			</p>
		</div>
	);
}
