import VideoCard from "@/components/Video/VideoCard";
import dbConnect from "@/lib/dbConnect";
import VIDEO from "@/models/VIDEO.model";
import React from "react";

export default async function page() {
	await dbConnect();
	const videos = await VIDEO.find()
		.limit(10)
		.select("_id title creator thumbnail video views createdAt")
		.populate({ path: "creator", select: "username _id avatar" });
	return (
		<div className="p-4 flex w-full flex-wrap">
			{videos.map((video) => (
				<VideoCard
					key={"ds"}
					video={{
						...JSON.parse(JSON.stringify(video)),
						createdAt: video.createdAt,
					}}
				/>
			))}
		</div>
	);
}
