import VideoCard from "@/components/Video/VideoCard";
import dbConnect from "@/lib/dbConnect";
import getUserIdFromJwt from "@/lib/getUserIdFromJwt";
import { CVideoCard } from "@/lib/types";
import { timeSince } from "@/lib/utils";
import WATCH_HISTORY from "@/models/WATCH_HISTORY";
import { cookies } from "next/headers";
import React from "react";

export default async function page() {
	const user_id = getUserIdFromJwt(cookies().get("token")?.value);

	await dbConnect();
	const history: { video: CVideoCard; lastWatched: Date }[] =
		await WATCH_HISTORY.find({
			user: user_id,
		})
			.select("video -_id lastWatched")
			.populate({
				path: "video",
				select: "_id title creator thumbnail video views createdAt",
				populate: {
					path: "creator",
					select: "username _id avatar",
				},
			})
			.sort("-lastWatched");
	return (
		<>
			<h1 className="p-2 text-2xl font-semibold">Your watch history :</h1>
			<div className="flex w-full flex-wrap">
				{history.map(({ video, lastWatched }) => (
					<div
						key={video._id}
						className="w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 p-2"
					>
						<VideoCard
							video={{
								...JSON.parse(JSON.stringify(video)),
								createdAt: video.createdAt,
							}}
							extraInfo={`Watched ${timeSince(lastWatched)}`}
						/>
					</div>
				))}
			</div>
		</>
	);
}
