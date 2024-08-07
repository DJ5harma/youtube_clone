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
	const [playVideo, setPlayVideo] = useState(false);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	return (
		<Link href={`/watch?video_id=${video._id}`} className="w-full">
			<video
				src={video.video.secure_url}
				ref={videoRef}
				className="rounded-2xl cursor-pointer"
				style={{ width: playVideo ? "100%" : "0%" }}
				onMouseLeave={() => {
					// setTimeout(() => {
					videoRef.current?.pause();
					setPlayVideo(false);
					// }, 1500);
				}}
			></video>

			<Image
				src={video.thumbnail.secure_url}
				alt=""
				width="640"
				height="360"
				className="rounded-2xl cursor-pointer"
				style={{ width: playVideo ? "0%" : "100%" }}
				onMouseEnter={() => {
					// setTimeout(() => {
					videoRef.current?.play();
					setPlayVideo(true);
					// }, 1500);
				}}
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
						<p
							// href={`/user/${video.creator.email}`}
							className="opacity-75 hover:opacity-100 w-fit cursor-pointer"
						>
							{video.creator.username}
						</p>
						<p className="text-xs opacity-75">
							{video.views} views ● {timeSince(video.createdAt)}
						</p>
						<p>{extraInfo}</p>
					</div>
				</div>
			</div>
		</Link>
	);
};
export default VideoCard;
