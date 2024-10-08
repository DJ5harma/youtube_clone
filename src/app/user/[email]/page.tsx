import ErrorComponent from "@/components/ErrorComponent";
import SubscribeSection from "@/components/SubscribeSection";
import VideoCard from "@/components/Video/VideoCard";
import getUserIdFromJwt from "@/lib/getUserIdFromJwt";
import USER from "@/models/USER.model";
import VIDEO from "@/models/VIDEO.model";
import Image from "next/image";
import React from "react";

export default async function page({
	params: { email },
}: {
	params: { email: string };
}) {
	const user_id = await getUserIdFromJwt();
	email = email.split("%40")[0] + "@" + email.split("%40")[1];

	if (!email)
		return (
			<ErrorComponent message="Looks like you're lost or this user doesn't exist" />
		);

	const creator = await USER.findOne({ email })
		.select("avatar _id username subscribers")
		.populate("avatar"); // getting the creator

	if (!creator)
		return <ErrorComponent message="Looks like this user doesn't exist" />;

	const [subscribed, videos] = await Promise.all([
		USER.exists({
			_id: user_id,
			subscriptions: { $in: [creator._id] },
		}),
		VIDEO.find({
			creator: creator._id,
		})
			.select("_id title creator thumbnail video views createdAt")
			.populate({ path: "creator", select: "username _id avatar email" }),
	]);
	return (
		<div className="flex flex-wrap">
			<div className="flex flex-col items-center p-2 w-full">
				<Image
					src={creator.avatar.secure_url}
					height={600}
					width={600}
					alt=""
					className="max-w-full rounded-2xl"
				/>
				<div className="absolute top-4">
					<div className="p-4 bg-neutral-500 backdrop-blur-xl bg-opacity-50 rounded-2xl">
						<SubscribeSection
							creator={JSON.parse(JSON.stringify(creator))}
							subscribed={subscribed ? true : false}
						/>
					</div>
				</div>
				<h1 className="text-2xl font-semibold my-4">{`${
					videos.length === 0
						? "No videos posted till now"
						: `Videos posted by ${creator.username} :`
				}`}</h1>
			</div>
			{videos.map((video) => (
				<div key={video._id} className="w-full sm:w-1/2 lg:w-1/3 2xl:w-1/4 p-2">
					<VideoCard video={JSON.parse(JSON.stringify(video))} />
				</div>
			))}
			<p className="p-2 fixed right-0 bottom-0"></p>
		</div>
	);
}
