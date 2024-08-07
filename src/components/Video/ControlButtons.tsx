"use client";
import React, { useState } from "react";
import { BiFastForward, BiPause, BiPlay } from "react-icons/bi";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";
import CustomTooltip from "../Nav/CustomTooltip";
import { getSeekbarTime } from "@/lib/utils";
import {
	PiSpeakerHighFill,
	PiSpeakerLowFill,
	PiSpeakerSimpleXFill,
} from "react-icons/pi";

const ControlButtons = ({
	paused,
	currentTime,
	fullscreen,
	togglePlay,
	toggleFullscreen,
	handleSeek,
	videoRef,
}: {
	paused: boolean;
	currentTime: number;
	fullscreen: boolean;
	togglePlay: () => void;
	toggleFullscreen: () => void;
	handleSeek: (val: number) => void;
	videoRef: React.RefObject<HTMLVideoElement>;
}) => {
	const [volume, setVolume] = React.useState(videoRef.current?.volume || 50);
	const [muted, setMuted] = React.useState(false);
	function toggleMute() {
		if (!videoRef.current) return;
		if (videoRef.current.muted) {
			videoRef.current.muted = false;
			setMuted(false);
			return;
		}
		videoRef.current.muted = true;
		setMuted(true);
	}
	function updateVolumeTo(val: number) {
		if (!videoRef.current) return;
		videoRef.current.volume = val;
		setVolume(val);
		localStorage.setItem("volume", `${val}`);
		if (val === 0) setMuted(true);
		else if (muted) setMuted(false);
	}

	React.useEffect(() => {
		const volume = localStorage.getItem("volume");
		updateVolumeTo(volume ? parseFloat(volume) : 0.5);

		const handleKeyPress = (e: KeyboardEvent) => {
			const activeElement = document.activeElement;
			if (
				activeElement &&
				(activeElement.tagName === "INPUT" ||
					activeElement.tagName === "TEXTAREA")
			)
				return;

			if (videoRef.current) {
				switch (e.key.toUpperCase()) {
					case " ":
						togglePlay();
						break;
					case "F":
						toggleFullscreen();
						break;
					case "M":
						toggleMute();
						break;
					case "ARROWLEFT":
						if (videoRef.current.currentTime - 5 >= 0)
							handleSeek(videoRef.current.currentTime - 5);
						break;
					case "ARROWRIGHT":
						if (videoRef.current.currentTime + 5 <= videoRef.current.duration)
							handleSeek(videoRef.current.currentTime + 5);
						break;
					case "ARROWUP":
						if (videoRef.current.volume + 0.05 <= 1)
							updateVolumeTo(videoRef.current.volume + 0.05);
						break;
					case "ARROWDOWN":
						if (videoRef.current.volume - 0.05 >= 0)
							updateVolumeTo(videoRef.current.volume - 0.05);
						break;
					default:
						break;
				}
			}
		};
		document.addEventListener("keydown", handleKeyPress);
		return () => document.removeEventListener("keydown", handleKeyPress);
	}, []);

	const [hideVolumeBar, setHideVolumeBar] = useState(true);

	return (
		<div
			className={`rounded-b-lg bg-black bg-opacity-75 w-full min-h-16 pb-2 justify-between items-center flex flex-col gap-2 pt-3 px-2 ${
				fullscreen && "fixed bottom-0 left-0"
			}`}
		>
			{videoRef.current?.duration && (
				<input
					className="h-1 w-full cursor-pointer"
					type="range"
					min={0}
					max={videoRef.current.duration}
					step={0.01}
					value={currentTime}
					style={{
						background: `linear-gradient(to right, blue ${
							(currentTime / videoRef.current.duration) * 100
						}%, grey ${
							((videoRef.current.duration - currentTime) /
								videoRef.current.duration) *
							100
						}%)`,
					}}
					onChange={(e) => handleSeek(parseFloat(e.target.value))}
				/>
			)}
			<div className="items-center justify-between w-full px-1 flex">
				<div className="items-center z-10 flex gap-2">
					<CustomTooltip
						size={30}
						icon={
							paused ? (
								<BiPlay onClick={togglePlay} />
							) : (
								<BiPause onClick={togglePlay} />
							)
						}
						text={paused ? "Play" : "Pause"}
					/>
					<CustomTooltip
						size={30}
						icon={<BiFastForward />}
						text="Play next ->"
					/>
					<div
						onMouseEnter={() => setHideVolumeBar(false)}
						onMouseLeave={() => setHideVolumeBar(true)}
						className="flex items-center w-fit"
					>
						<CustomTooltip
							icon={
								muted ? (
									<PiSpeakerSimpleXFill onClick={toggleMute} />
								) : volume < 0.5 ? (
									<PiSpeakerLowFill onClick={toggleMute} />
								) : (
									<PiSpeakerHighFill onClick={toggleMute} />
								)
							}
							text={muted ? "Unmute" : "Mute"}
						/>

						{!hideVolumeBar && (
							<input
								className="w-16 h-1 cursor-pointer"
								type="range"
								min={0}
								max={1}
								step={0.01}
								value={muted ? 0 : volume}
								onChange={(e) => updateVolumeTo(parseFloat(e.target.value))}
							/>
						)}
					</div>
					<div className="text-xs gap-1 ml-3 flex">
						{getSeekbarTime(currentTime)}
						<p>/</p>
						{getSeekbarTime(videoRef.current?.duration || 0)}
					</div>
				</div>

				<CustomTooltip
					size={30}
					icon={
						fullscreen ? (
							<MdFullscreenExit onClick={toggleFullscreen} />
						) : (
							<MdFullscreen onClick={toggleFullscreen} />
						)
					}
					text={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
				/>
			</div>
		</div>
	);
};

export default ControlButtons;
