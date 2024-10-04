import ErrorComponent from "@/components/ErrorComponent";
import SubscribeSection from "@/components/SubscribeSection";
import Comments from "@/components/Video/Comments";
import Description from "@/components/Video/Description";
import VideoActions from "@/components/Video/VideoActions";
import VideoCard from "@/components/Video/VideoCard";
import VideoPlayer from "@/components/Video/VideoPlayer/VideoPlayer";
import dbConnect from "@/lib/dbConnect";
import getUserIdFromJwt from "@/lib/getUserIdFromJwt";
import { CComment, CVideoCard, CVideoPlayable } from "@/lib/types";
import COMMENT from "@/models/COMMENT.model";
import USER from "@/models/USER.model";
import VIDEO from "@/models/VIDEO.model";
import WATCH_HISTORY from "@/models/WATCH_HISTORY";
import { revalidatePath } from "next/cache";
import React from "react";

export default async function page({
	searchParams: { video_id },
}: {
	searchParams: { video_id: string };
}) {
	await dbConnect();
	const video: CVideoPlayable = await VIDEO.findByIdAndUpdate(
		video_id,
		{ $inc: { views: +1 } },
		{ new: true }
	)
		.select(
			"-_id title creator thumbnail video views createdAt likes dislikes description"
		)
		.populate({
			path: "creator",
			select: "username _id avatar subscribers email",
		});
	if (!video)
		return <ErrorComponent message="Looks like this video doesn't exist..." />;

	const user_id = await getUserIdFromJwt();

	const [subscribed, moreVideos, ratingByThisUser, comments]: [
		{ _id: string } | null,
		CVideoCard[],
		{ videoRatings: [{ isPositive: boolean }] } | null,
		CComment[]
	] = await Promise.all([
		user_id
			? USER.exists({
					_id: user_id,
					subscriptions: { $in: [video.creator._id] },
			  })
			: null,
		VIDEO.find()
			.select("_id title creator thumbnail video views createdAt")
			.populate({ path: "creator", select: "username _id avatar" }),
		user_id
			? USER.findOne(
					{ "videoRatings.video": video_id },
					{ "videoRatings.$": 1 }
			  ).select("-_id")
			: null,
		COMMENT.find({ video: video_id })
			.select("_id body commenter createdAt")
			.populate({ path: "commenter", select: "username -_id avatar email" }),
	]); // all of them are

	if (user_id)
		WATCH_HISTORY.findOneAndUpdate(
			{ user: user_id, video: video_id },
			{ lastWatched: Date.now() },
			{ upsert: true }
		).then(() => revalidatePath("/watchHistory"));

	const userRating = ratingByThisUser
		? ratingByThisUser.videoRatings[0].isPositive
			? 1
			: -1
		: 0;

	return (
		<div className="flex-wrap sm:p-4 sm:gap-4 lg:flex-nowrap overflow-x-hidden flex">
			<div className="flex flex-col w-full pb-2 lg:w-7/12">
				<VideoPlayer
					duration={video.video.duration}
					secure_url={video.video.secure_url}
					title={video.title}
				/>
				<div className="px-2 flex w-full justify-between flex-col gap-3 sm:flex-row">
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
				<Description
					createdAt={video.createdAt}
					description={video.description}
					views={video.views}
				/>
				<Comments
					comments={comments.map((comment) => {
						return {
							...JSON.parse(JSON.stringify(comment)),
							createdAt: comment.createdAt,
							_id: comment._id.toString(),
						};
					})}
					video_id={video_id}
				/>
			</div>
			<div className="px-4 sm:px-2 gap-2 flex flex-wrap lg:flex-col lg:w-1/3">
				<h2 className="text-xl font-semibold py-2">More Videos</h2>
				{moreVideos
					.filter(({ _id }) => _id.toString() !== video_id)
					.map((video) => (
						<VideoCard
							key={video._id}
							video={JSON.parse(JSON.stringify(video))}
						/>
					))}
			</div>
		</div>
	);
}
