import VideoCard from "@/components/Video/VideoCard";
import dbConnect from "@/lib/dbConnect";
import { CVideoCard } from "@/lib/types";
import VIDEO from "@/models/VIDEO.model";
import React from "react";

export default async function page() {
	await dbConnect();
	const videos: CVideoCard[] = await VIDEO.find()
		.limit(10)
		.select("_id title creator thumbnail video views createdAt")
		.populate({ path: "creator", select: "username _id avatar" });
	return (
		<div className="flex w-full flex-wrap">
			{videos.map((video) => (
				<div key={video._id} className="w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 p-2">
					<VideoCard
						video={{
							...JSON.parse(JSON.stringify(video)),
							createdAt: video.createdAt,
						}}
					/>
				</div>
			))}
		</div>
	);
}
