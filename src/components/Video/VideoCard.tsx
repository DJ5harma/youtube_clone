"use client";
import { CVideoCard } from "@/lib/types";
import { croppedAvatarUrl, timeSince } from "@/lib/utils";
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

	const [playVideo, setPlayVideo] = useState(false);
	return (
		<div
			className="w-full"
			onMouseEnter={() => {
				setPlayVideo(true);
				videoRef.current?.play();
			}}
			onMouseLeave={() => {
				setPlayVideo(false);
				videoRef.current?.pause();
			}}
		>
			<Link href={`/watch?video_id=${video._id}`}>
				<video
					src={video.video.secure_url}
					ref={videoRef}
					className="rounded-2xl cursor-pointer"
					style={{ width: playVideo ? "100%" : "0%" }}
					onTimeUpdate={() =>
						setCurrentTime(videoRef.current?.currentTime || 0)
					}
				></video>
			</Link>
			{playVideo && videoRef.current && (
				<input
					className="h-5 w-full cursor-pointer"
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

			<Image
				src={video.thumbnail.secure_url}
				alt=""
				width={1280}
				height={720}
				className="rounded-2xl cursor-pointer object-cover aspect-video"
				style={{ width: playVideo ? "0%" : "100%" }}
			/>
			<div className="flex gap-3 px-2 pt-1">
				<Link href={`/user/${video.creator.email}`}>
					<Image
						src={croppedAvatarUrl(video.creator.avatar.public_id)}
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
