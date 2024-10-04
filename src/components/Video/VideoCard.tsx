"use client";
import { CVideoCard } from "@/lib/types";
import {
	croppedAvatarUrl,
	getSeekbarTime,
	getSrc,
	timeSince,
} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

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
	); // this state will be used to smoothly rerender the seekbar at the

	function handleSeek(val: number) {
		if (!videoRef.current) return;
		videoRef.current.currentTime = val;
		setCurrentTime(val);
	} // will update the video's current time and the state too when video's current time changes due to any reason/option I provided

	const [isHovered, setIsHovered] = useState(false); // hovering on the video will set this to true which will render the controls (if false, the controls will remain hidden)
	const [videoLoaded, setVideoLoaded] = useState(false); // if this stores true, the video will start loading (after a certain time when the user hovers continuously)

	let lock = false; // a mutex that will help in syncing the hovering and showing of video controls after the specified timeout.
	const handleMouseEnter = () => {
		lock = false;
		setTimeout(() => {
			if (lock) return;
			lock = true;
			setIsHovered(true);
			setVideoLoaded(true);
			videoRef.current?.play();
			lock = false;
		}, 1200); // this will run everytime the mouse is hovered but will only setIsHovered to true if the lock hasn't been set to true by another setTimeout that ran before
	};

	const handleMouseLeave = () => {
		lock = true;
		videoRef.current?.pause();
		setIsHovered(false);
	}; // opens the lock, hiding the controls

	return (
		<div
			className="w-full"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className="relative">
				<Link
					href={`/watch?video_id=${video._id}`}
					onClick={() => toast.loading("Loading video")}
				>
					{videoLoaded && (
						<video
							src={getSrc(video.video.secure_url, "video")}
							ref={videoRef}
							className={`${
								!isHovered && "w-0"
							} rounded cursor-pointer object-cover aspect-video`}
							autoPlay
							onTimeUpdate={
								() => setCurrentTime(videoRef.current?.currentTime || 0) // just updating the time state
							}
							muted={false}
						></video>
					)}

					<Image
						src={getSrc(video.thumbnail.secure_url, "image")}
						alt=""
						width={1280}
						height={720}
						className={`rounded cursor-pointer object-cover aspect-video ${
							isHovered && "w-0"
						}`}
					/>
				</Link>

				<Button className="rounded-md m-2 p-2 text-sm absolute bottom-0 right-0 z-50 cursor-default">
					{getSeekbarTime(video.video.duration)}
				</Button>
			</div>
			{videoLoaded && videoRef.current && isHovered && (
				<input
					className="h-6 w-full cursor-pointer relative bottom-3.5"
					type="range"
					min={0}
					max={videoRef.current.duration}
					step={0.01}
					value={currentTime}
					onChange={(e) => handleSeek(parseFloat(e.target.value))}
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
