"use client";
import { croppedAvatarUrl } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const SubscribeSection = ({
	creator,
}: {
	creator: {
		avatar: { public_id: string };
		subscribers: number;
		username: string;
		_id: string;
	};
}) => {
	return (
		<div className="flex gap-2 w-full">
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
					{creator.subscribers} subscriber
					{creator.subscribers !== 1 ? "s" : ""}
				</p>
			</div>
			<Button>Subscribe</Button>
		</div>
	);
};

export default SubscribeSection;
