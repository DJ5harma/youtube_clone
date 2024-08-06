"use client";
import { croppedAvatarUrl, timeSince } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const VideoCard = ({
	video,
}: {
	video: {
		_id: string;
		title: string;
		views: number;
		thumbnail: { secure_url: string };
		video: { secure_url: string };
		creator: {
			username: string;
			_id: string;
			avatar: { secure_url: string; public_id: string };
		};
		createdAt: Date;
	};
}) => {
	const [playVideo, setPlayVideo] = useState(false);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	return (
		<Link
			href={`/watch?video_id=${video._id}`}
			className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2"
		>
			<video
				src={video.video.secure_url}
				ref={videoRef}
				className="rounded-2xl cursor-pointer"
				style={{ width: playVideo ? "100%" : "0%" }}
				onMouseLeave={() => {
					// setTimeout(() => {
					videoRef.current?.pause();
					setPlayVideo(false);
					// }, 1000);
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
					// }, 1000);
				}}
			/>
			<div className="flex gap-3">
				<Image
					src={croppedAvatarUrl(video.creator.avatar.public_id)}
					alt=""
					width="40"
					height="40"
					className="rounded-full w-10 h-10 relative top-2"
				/>
				<div className="flex flex-col py-2">
					<p>{video.title}</p>
					<div className="text-sm gap-0.5 flex flex-col">
						<p className="opacity-75 hover:opacity-100 w-fit cursor-pointer">
							{video.creator.username}
						</p>
						<p className="text-xs opacity-75">
							{video.views} views ● {timeSince(video.createdAt)}
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
};
export default VideoCard;
