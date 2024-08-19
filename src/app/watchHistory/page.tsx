import ErrorComponent from "@/components/ErrorComponent";
import VideoCard from "@/components/Video/VideoCard";
import dbConnect from "@/lib/dbConnect";
import getUserIdFromJwt from "@/lib/getUserIdFromJwt";
import { CVideoCard } from "@/lib/types";
import { timeSince } from "@/lib/utils";
import WATCH_HISTORY from "@/models/WATCH_HISTORY";
import React from "react";

export default async function page() {
	const user_id = await getUserIdFromJwt();

	if (!user_id)
		return (
			<ErrorComponent
				message="An account is needed to posses a WatchHistory"
				showForm
			/>
		);

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
					select: "username _id avatar email",
				},
			})
			.sort("-lastWatched");
	if (!history || history.length === 0)
		return (
			<ErrorComponent message="Seems like you don't posses a WatchHistory" />
		);
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
							video={JSON.parse(JSON.stringify(video))}
							extraInfo={`Watched ${timeSince(lastWatched)}`}
						/>
					</div>
				))}
			</div>
		</>
	);
}
