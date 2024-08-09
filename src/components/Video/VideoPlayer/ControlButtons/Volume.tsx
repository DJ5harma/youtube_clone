"use client";
import React, { RefObject, useEffect, useState } from "react";
import {
	PiSpeakerHighFill,
	PiSpeakerLowFill,
	PiSpeakerSimpleXFill,
} from "react-icons/pi";
import CustomTooltip from "@/components/Nav/CustomTooltip";
import { Input } from "@/components/ui/input";

const Volume = ({ videoRef }: { videoRef: RefObject<HTMLVideoElement> }) => {
	const [volume, setVolume] = useState(videoRef.current?.volume || 1);
	const [isMuted, setIsMuted] = useState(videoRef.current?.muted || false);
	("");

	useEffect(() => {
		if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
			const storedVol = localStorage.getItem("volume");
			const vol = storedVol ? parseFloat(storedVol) : 1;
			setVolume(vol);
			if (videoRef.current) videoRef.current.volume = vol;
		}
		const handleKeyPress = (e: KeyboardEvent) => {
			if (videoRef.current && document.activeElement?.tagName !== "INPUT") {
				switch (e.key.toUpperCase()) {
					case "ARROWUP":
						e.preventDefault();
						if (videoRef.current.volume + 0.05 <= 1) {
							videoRef.current.volume += 0.05;
							setVolume(videoRef.current.volume);
						}
						break;
					case "ARROWDOWN":
						e.preventDefault();
						if (videoRef.current.volume - 0.05 > 0) {
							videoRef.current.volume -= 0.05;
							setVolume(videoRef.current.volume);
						}
						break;
					case "M":
						e.preventDefault();
						if (videoRef.current.volume === 0) {
							videoRef.current.volume = volume;
							setIsMuted(false);
						} else {
							videoRef.current.volume = 0;
							setIsMuted(true);
						}
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
		<div className="flex items-center w-fit h-full">
			<CustomTooltip
				icon={
					volume === 0 || videoRef.current?.muted || isMuted ? (
						<PiSpeakerSimpleXFill />
					) : volume < 0.5 ? (
						<PiSpeakerLowFill />
					) : (
						<PiSpeakerHighFill />
					)
				}
				text={true ? "Unmute" : "Mute"}
			/>

			<Input
				type="range"
				min={0}
				max={1}
				step="0.000001"
				value={
					volume ||
					localStorage.getItem("volume") ||
					videoRef.current?.volume ||
					0
				}
				className="h-2 w-20"
				onChange={(e) => {
					if (videoRef.current) {
						const newVol = (videoRef.current.volume = e.target.valueAsNumber);
						setVolume(newVol);
						localStorage.setItem("volume", newVol.toString());
					}
				}}
			/>
		</div>
	);
};

export default Volume;
