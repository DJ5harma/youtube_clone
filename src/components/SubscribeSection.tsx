"use client";
import { croppedAvatarUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useUser } from "@/app/providers/UserProvider";
import toast from "react-hot-toast";

const SubscribeSection = ({
	creator,
	subscribed,
}: {
	creator: {
		avatar: { public_id: string };
		subscribers: number;
		username: string;
		_id: string;
	};
	subscribed: boolean;
}) => {
	const { user } = useUser();
	const [isSubscribed, setIsSubscribed] = useState(subscribed);
	const [shownSubCount, setShownSubCount] = useState(creator.subscribers);

	const handleClick = async () => {
		if (!user._id) return toast.error("Sign in required");
		const todo = isSubscribed ? "UNSUBSCRIBE" : "SUBSCRIBE";
		setShownSubCount((prev) => (todo === "SUBSCRIBE" ? prev + 1 : prev - 1));
		setIsSubscribed(!isSubscribed);
		const { errMessage } = (
			await axios.post("/api/channels/toggleSubscribe", {
				creator_id: creator._id,
				todo,
			})
		).data;
		if (errMessage) return toast.error(errMessage);
	};

	return (
		<div className="flex pt-1 pb-2 gap-2 items-center w-full justify-between sm:w-fit sm:justify-start">
			<div className="flex gap-2 items-center">
				<Image
					src={croppedAvatarUrl(creator.avatar.public_id)}
					height={40}
					width={40}
					alt=""
					className="rounded-full w-10 h-10"
				/>
				<div className="gap-0.5 flex flex-col">
					<p className="hover:opacity-100 w-fit cursor-pointer">
						{creator.username}
					</p>
					<p className="text-xs opacity-75 flex">
						{shownSubCount} subscriber
						{shownSubCount !== 1 ? "s" : ""}
					</p>
				</div>
			</div>

			<Button
				className="rounded-full"
				variant={isSubscribed ? "outline" : "default"}
				onClick={handleClick}
			>
				{"Subscribe" + (isSubscribed ? "d" : "")}
			</Button>
		</div>
	);
};

export default SubscribeSection;
