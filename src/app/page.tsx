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
		<div className="p-4 flex w-full flex-wrap">
			{videos.map((video) => (
				<VideoCard
					key={video._id}
					video={{
						...JSON.parse(JSON.stringify(video)),
						createdAt: video.createdAt,
					}}
				/>
			))}
		</div>
	);
}
