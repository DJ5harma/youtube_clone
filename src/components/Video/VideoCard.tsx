"use client";
import timeSince from "@/lib/timeSince";
import Image from "next/image";
import { useRef, useState } from "react";

const VideoCard = ({
	video,
	cloudName,
}: {
	video: {
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
	cloudName: string;
}) => {
	const croppedAvatarUrl = `https://res.cloudinary.com/${cloudName}/image/upload/c_crop,w_300,h_300/${video.creator.avatar.public_id}.jpg`;

	const [playVideo, setPlayVideo] = useState(false);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	return (
		<div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
			<video
				src={video.video.secure_url}
				ref={videoRef}
				controls
				autoPlay
				className="rounded-2xl"
				style={{ width: playVideo ? "100%" : "0%" }}
				onMouseLeave={() => {
					setTimeout(() => {
						videoRef.current?.pause();
						setPlayVideo(false);
					}, 1000);
				}}
			></video>

			<Image
				src={video.thumbnail.secure_url}
				alt=""
				width="640"
				height="360"
				className="rounded-2xl"
				style={{ width: playVideo ? "0%" : "100%" }}
				onMouseEnter={() => {
					setTimeout(() => {
						videoRef.current?.play();
						setPlayVideo(true);
					}, 1000);
				}}
			/>
			<div className="flex gap-3">
				<Image
					src={croppedAvatarUrl}
					alt=""
					width="40"
					height="40"
					className="rounded-full w-10 h-10 relative top-2"
				/>
				<div className="flex flex-col py-2">
					<p>{video.title}</p>
					<div className="opacity-75 text-sm gap-0.5 flex flex-col">
						<p>{video.creator.username}</p>
						<p className="text-xs">
							{video.views} views ● {timeSince(video.createdAt)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
export default VideoCard;