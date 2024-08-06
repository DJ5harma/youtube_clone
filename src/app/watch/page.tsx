import SubscribeSection from "@/components/SubscribeSection";
import VideoActions from "@/components/Video/VideoActions";
import ActionButtons from "@/components/Video/VideoActions";
import VideoCard from "@/components/Video/VideoCard";
import VideoPlayer from "@/components/Video/VideoPlayer";
import dbConnect from "@/lib/dbConnect";
import getUserIdFromJwt from "@/lib/getUserIdFromJwt";
import { CVideoCard, CVideoPlayable } from "@/lib/types";
import USER from "@/models/USER.model";
import VIDEO from "@/models/VIDEO.model";
import { cookies } from "next/headers";
import React from "react";

export default async function page({
	searchParams: { video_id },
}: {
	searchParams: { video_id: string };
}) {
	await dbConnect();
	const video: CVideoPlayable = await VIDEO.findById(video_id)
		.select(
			"-_id title creator thumbnail video views createdAt likes dislikes description"
		)
		.populate({
			path: "creator",
			select: "username _id avatar subscribers",
		});
	const user_id = getUserIdFromJwt(cookies().get("token")?.value);
	const [subscribed, moreVideos, test] = await Promise.all([
		USER.exists({
			_id: user_id,
			subscriptions: { $in: [video.creator._id] },
		}),
		VIDEO.find()
			.select("_id title creator thumbnail video views createdAt")
			.populate({ path: "creator", select: "username _id avatar" }),
		USER.findOne(
			{ "videoRatings.video": video_id },
			{ "videoRatings.$": 1 }
		).select("-_id"),
	]);
	// const { isPositive } = videoRatings[0].isPositive;
	const userRating = test ? (test.videoRatings[0].isPositive ? 1 : -1) : 0;

	return (
		<div className="flex-wrap sm:p-4 sm:gap-4 lg:flex-nowrap overflow-x-hidden border flex">
			<div className="flex flex-col w-full lg:w-7/12 border">
				<VideoPlayer
					video={{
						...JSON.parse(JSON.stringify(video)),
						createdAt: video.createdAt,
					}}
				/>
				<div className="px-2 flex w-full justify-between flex-col sm:flex-row gap-3">
					<SubscribeSection
						creator={JSON.parse(JSON.stringify(video.creator))}
						subscribed={subscribed ? true : false}
					/>
					<VideoActions
						dislikes={video.dislikes}
						likes={video.likes}
						userRating={userRating}
						video_id={video_id}
					/>
				</div>
			</div>
			<div className="px-2 gap-2 border flex flex-wrap lg:flex-col lg:w-1/3">
				{moreVideos.map((video) => (
					<VideoCard
						key={video._id}
						video={{
							...JSON.parse(JSON.stringify(video)),
							createdAt: video.createdAt,
						}}
					/>
				))}
			</div>
		</div>
	);
}
