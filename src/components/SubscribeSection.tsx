"use client";
import { croppedAvatarUrl, getSrc } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useUser } from "@/providers/UserProvider";
import toast from "react-hot-toast";
import Link from "next/link";
import { CCreator } from "@/lib/types";

const SubscribeSection = ({
	creator,
	subscribed,
}: {
	creator: CCreator;
	subscribed: boolean;
}) => {
	const { user, setShowForm } = useUser();
	const [isSubscribed, setIsSubscribed] = useState(subscribed); // this state is made to give instant response to user on subscribe-action. The server-code of actually registering the subscription will be run afterwards. Some error may occur at the backend and the action on client side may prove to be useless but then client will be notified via a toast so ig worth it?
	const [shownSubCount, setShownSubCount] = useState(creator.subscribers);

	const handleClick = async () => {
		if (!user._id) {
			setShowForm(true);
			return toast.error("Sign in to Subscribe");
		}
		const todo = isSubscribed ? "UNSUBSCRIBE" : "SUBSCRIBE"; // the action will be directly opposite to the state

		setShownSubCount((prev) => (todo === "SUBSCRIBE" ? prev + 1 : prev - 1)); // inc/dec the sub-count here only (I know that this won't reflect the actual total sub-count of the channel at that time as that will require some websockets for live count but ig for now it's okk?)

		setIsSubscribed(!isSubscribed);
		const { errMessage } = (
			await axios.post("/api/channels/toggleSubscribe", {
				creator_id: creator._id,
				todo,
			})
		).data;
		if (errMessage) return toast.error(errMessage);
	}; // handles the clicking of subscribe/unsubscribe btn

	return (
		<div className="flex pt-1 pb-2 gap-2 items-center w-full justify-between sm:w-fit sm:justify-start">
			<div className="flex gap-2 items-center">
				<Link href={`/user/${creator.email}`}>
					<Image
						src={getSrc(croppedAvatarUrl(creator.avatar.public_id), "image")}
						height={40}
						width={40}
						alt=""
						className="rounded-full w-10 h-10"
					/>
				</Link>
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
				variant={isSubscribed && user._id ? "outline" : "default"}
				onClick={handleClick}
			>
				{"Subscribe" + (isSubscribed && user._id ? "d" : "")}
			</Button>
		</div>
	);
};

export default SubscribeSection;
