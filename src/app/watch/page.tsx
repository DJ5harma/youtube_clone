import SubscribeSection from "@/components/SubscribeSection";
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
	const [video, moreVideos]: [CVideoPlayable, CVideoCard[]] = await Promise.all(
		[
			VIDEO.findById(video_id)
				.select(
					"-_id title creator thumbnail video views createdAt likes dislikes description"
				)
				.populate({
					path: "creator",
					select: "username _id avatar subscribers",
				}),
			VIDEO.find()
				.select("_id title creator thumbnail video views createdAt")
				.populate({ path: "creator", select: "username _id avatar" }),
		]
	);
	const subscribed = await USER.exists({
		_id: getUserIdFromJwt(cookies().get("token")?.value),
		subscriptions: { $in: [video.creator._id] },
	});

	return (
		<div className="p-4 overflow-x-hidden border">
			<VideoPlayer
				video={{
					...JSON.parse(JSON.stringify(video)),
					createdAt: video.createdAt,
				}}
			/>
			<div className="px-2">
				<SubscribeSection
					creator={JSON.parse(JSON.stringify(video.creator))}
					subscribed={subscribed ? true : false}
				/>
			</div>
		</div>
	);
}
