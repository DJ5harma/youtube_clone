import VideoCard from "@/components/Video/VideoCard";
import dbConnect from "@/lib/dbConnect";
import getUserIdFromJwt from "@/lib/getUserIdFromJwt";
import { CVideoCard } from "@/lib/types";
import { timeSince } from "@/lib/utils";
import USER from "@/models/USER.model";
import { cookies } from "next/headers";
import React from "react";

export default async function page() {
	const user_id = getUserIdFromJwt(cookies().get("token")?.value);

	await dbConnect();
	const {
		videoRatings,
	}: {
		videoRatings: {
			isPositive: boolean;
			video: CVideoCard;
		}[];
	} = await USER.findById(user_id).populate({
		path: "videoRatings.video",
		select: "_id title creator thumbnail video views createdAt",
		populate: {
			path: "creator",
			select: "username _id avatar",
		},
	});

	const likedVideos = videoRatings.filter(
		({ isPositive }) => isPositive === true
	);
	const dislikedVideos = videoRatings.filter(
		({ isPositive }) => isPositive === false
	);

	return (
		<>
			<h1 className="p-2 text-2xl font-semibold">
				{likedVideos.length === 0
					? "You haven't liked any videos"
					: "The videos you liked :"}
			</h1>
			<div className="flex w-full flex-wrap">
				{likedVideos.map(({ video }) => (
					<div
						key={video._id}
						className="w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 p-2"
					>
						<VideoCard
							video={{
								...JSON.parse(JSON.stringify(video)),
								createdAt: video.createdAt,
							}}
						/>
					</div>
				))}
			</div>
			<h1 className="p-2 text-2xl font-semibold">
				{dislikedVideos.length === 0
					? "You haven't disliked any videos"
					: "Andd the ones you disliked are :"}
			</h1>
			<div className="flex w-full flex-wrap">
				{dislikedVideos.map(({ video }) => (
					<div
						key={video._id}
						className="w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 p-2"
					>
						<VideoCard
							video={{
								...JSON.parse(JSON.stringify(video)),
								createdAt: video.createdAt,
							}}
						/>
					</div>
				))}
			</div>
		</>
	);
}
