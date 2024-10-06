"use client";
import React, { RefObject, useEffect, useState } from "react";
import {
	PiSpeakerHighFill,
	PiSpeakerLowFill,
	PiSpeakerSimpleXFill,
} from "react-icons/pi";
import CustomTooltip from "@/components/Nav/CustomTooltip";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const Volume = ({ videoRef }: { videoRef: RefObject<HTMLVideoElement> }) => {
	const [volume, setVolume] = useState(videoRef.current?.volume || 1);
	const [isMuted, setIsMuted] = useState(videoRef.current?.muted || false);

	const toggleMute = () => {
		if (videoRef.current)
			if (videoRef.current.volume === 0) {
				videoRef.current.volume = volume;
				setIsMuted(false);
			} else {
				videoRef.current.volume = 0;
				setIsMuted(true);
			}
	};

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
						toast.dismiss();
						if (videoRef.current.volume + 0.05 <= 1) {
							videoRef.current.volume += 0.05;
							setVolume(videoRef.current.volume);
							toast.success(
								"Volume increased to " +
									(videoRef.current.volume * 100).toFixed(0) +
									"%",
								{
									duration: 1000,
								}
							);
						} else {
							toast.error("Volume is maximum!", {
								duration: 1000,
							});
						}
						break;
					case "ARROWDOWN":
						e.preventDefault();
						toast.dismiss();
						if (videoRef.current.volume - 0.05 > 0) {
							videoRef.current.volume -= 0.05;
							setVolume(videoRef.current.volume);
							toast.success(
								"Volume decreased to " +
									(videoRef.current.volume * 100).toFixed(0) +
									"%",
								{
									duration: 1000,
								}
							);
						} else {
							toast.error("Volume is minimum!", {
								duration: 1000,
							});
						}
						break;
					case "M":
						e.preventDefault();
						toggleMute();
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
			<div onClick={toggleMute}>
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
			</div>

			<input
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
				className="w-20 cursor-pointer hidden md:flex"
				onChange={(e) => {
					if (videoRef.current) {
						const newVol = (videoRef.current.volume = e.target.valueAsNumber);
						setVolume(newVol);
						if (window.innerWidth > 640)
							localStorage.setItem("volume", newVol.toString());
						toast.dismiss();
						toast.success(
							"Volume set to " +
								(e.target.valueAsNumber * 100).toFixed(0) +
								" %",
							{
								duration: 1000,
							}
						);
					}
				}}
			/>
		</div>
	);
};

export default Volume;
