"use client";
import { CVideoCard } from "@/lib/types";
import { croppedAvatarUrl, getSrc, timeSince } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const VideoCard = ({
	video,
	extraInfo,
}: {
	video: CVideoCard;
	extraInfo?: string;
}) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [currentTime, setCurrentTime] = useState<number>(
		videoRef.current?.currentTime || 0
	);
	function handleSeek(val: number) {
		if (!videoRef.current) return;
		videoRef.current.currentTime = val;
		setCurrentTime(val);
	}

	const [isHovered, setIsHovered] = useState(false);
	const [videoLoaded, setVideoLoaded] = useState(false);

	let lock = false;
	const handleMouseEnter = () => {
		lock = false;
		setTimeout(() => {
			if (lock) return;
			lock = true;
			setIsHovered(true);
			setVideoLoaded(true);
			videoRef.current?.play();
			lock = false;
		}, 1200);
	};
	const handleMouseLeave = () => {
		lock = true;
		videoRef.current?.pause();
		setIsHovered(false);
	};

	return (
		<div
			className="w-full"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<Link href={`/watch?video_id=${video._id}`}>
				{videoLoaded && (
					<video
						src={getSrc(video.video.secure_url, "video")}
						ref={videoRef}
						className={`${
							!isHovered ? "w-0" : ""
						} rounded cursor-pointer object-cover aspect-video`}
						autoPlay
						onTimeUpdate={() => {
							setCurrentTime(videoRef.current?.currentTime || 0);
						}}
						muted={false}
					></video>
				)}

				<Image
					src={getSrc(video.thumbnail.secure_url, "image")}
					alt=""
					width={1280}
					height={720}
					className={`rounded cursor-pointer object-cover aspect-video ${
						isHovered ? "w-0" : ""
					}`}
				/>
			</Link>
			{videoLoaded && videoRef.current && isHovered && (
				<input
					className="h-6 w-full cursor-pointer relative bottom-3.5"
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
					// onMouseEnter={handleMouseEnter}
				/>
			)}
			<div className={`flex gap-3 px-2 ${isHovered ? "-mt-6" : ""}`}>
				<Link href={`/user/${video.creator.email}`}>
					<Image
						src={getSrc(
							croppedAvatarUrl(video.creator.avatar.public_id),
							"image"
						)}
						alt=""
						width="40"
						height="40"
						className="rounded-full w-10 h-10 relative top-2"
					/>
				</Link>
				<div className="flex flex-col py-2">
					<p>{video.title}</p>
					<div className="text-sm gap-0.5 flex flex-col">
						<Link href={`/user/${video.creator.email}`}>
							<p className="opacity-75 hover:opacity-100 w-fit cursor-pointer">
								{video.creator.username}
							</p>
						</Link>
						<p className="text-xs opacity-75">
							{video.views} views ● {timeSince(video.createdAt)}
						</p>
						<p>{extraInfo}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default VideoCard;
