import VideoPlayer from "@/components/Video/VideoPlayer";
import dbConnect from "@/lib/dbConnect";
import VIDEO from "@/models/VIDEO.model";
import React from "react";

export default async function page({
	searchParams: { video_id },
}: {
	searchParams: { video_id: string };
}) {
	await dbConnect();
	const [video, moreVideos]: [
		{
			title: string;
			creator: {
				username: string;
				_id: string;
				avatar: {
					secure_url: string;
					public_id: string;
				};
			};
			thumbnail: {
				secure_url: string;
				public_id: string;
			};
			video: {
				secure_url: string;
				public_id: string;
			};
			views: string;
			createdAt: Date;
			likes: number;
			dislikes: number;
			description: string;
		},
		{
			_id: string;
			title: string;
			creator: {
				username: string;
				_id: string;
				avatar: {
					secure_url: string;
					public_id: string;
				};
			};
			thumbnail: {
				secure_url: string;
				public_id: string;
			};
			video: {
				secure_url: string;
				public_id: string;
			};
			views: string;
			createdAt: Date;
		}[]
	] = await Promise.all([
		VIDEO.findById(video_id)
			.select(
				"-_id title creator thumbnail video views createdAt likes dislikes description"
			)
			.populate({ path: "creator", select: "username _id avatar" }),
		VIDEO.find()
			.select("_id title creator thumbnail video views createdAt")
			.populate({ path: "creator", select: "username _id avatar" }),
	]);

	return (
		<div className="p-4 overflow-x-hidden">
			<VideoPlayer
				video={{
					...JSON.parse(JSON.stringify(video)),
					createdAt: video.createdAt,
				}}
			/>
			<div></div>
		</div>
	);
}
