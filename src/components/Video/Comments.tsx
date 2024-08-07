"use client";
import React, { useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { CComment } from "@/lib/types";
import { Input } from "../ui/input";
import { useUser } from "@/app/providers/UserProvider";
import { croppedAvatarUrl, timeSince } from "@/lib/utils";
import Image from "next/image";
import { IoIosSend } from "react-icons/io";
import toast from "react-hot-toast";
import axios from "axios";
import CustomTooltip from "../Nav/CustomTooltip";
import Link from "next/link";

const Comments = ({
	comments,
	video_id,
}: {
	comments: CComment[];
	video_id: string;
}) => {
	const [shownComments, setShownComments] = useState<CComment[]>(comments);
	const { user } = useUser();
	const [body, setBody] = useState("");

	const handleSubmit = async () => {
		if (!user._id) return toast.error("Sign in required");
		const { errMessage } = (
			await axios.post("/api/videos/addComment", {
				body,
				video_id,
			})
		).data;
		const comment: CComment = {
			body,
			commenter: user,
			createdAt: new Date(),
			dislikes: 0,
			likes: 0,
		};
		if (errMessage) return toast.error(errMessage);
		setShownComments([comment, ...shownComments]);
	};

	return (
		<Accordion type="single" collapsible defaultValue="item-1">
			<AccordionItem value="item-1" className="px-4 border-4 rounded-xl">
				<AccordionTrigger>
					<div className="flex justify-between w-full pr-2">
						<p>Comments</p>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<div className="flex items-center gap-2 mb-4">
						<Link href={`/user/${user.email}`}>
							<Image
								src={croppedAvatarUrl(user.avatar.public_id)}
								alt=""
								width="40"
								height="40"
								className="rounded-full w-8 h-8"
							/>
						</Link>
						<Input
							placeholder="Add comment..."
							value={body}
							onChange={(e) => setBody(e.target.value)}
						/>
						<CustomTooltip
							icon={<IoIosSend onClick={handleSubmit} />}
							text="Post comment"
							size={30}
						/>
					</div>
					{shownComments.map(({ body, commenter, createdAt }) => (
						<div className="w-full flex gap-4" key={createdAt.toISOString()}>
							<Link href={`/user/${commenter.email}`}>
								<Image
									src={croppedAvatarUrl(commenter.avatar.public_id)}
									alt=""
									width="40"
									height="40"
									className="rounded-full w-8 h-8"
								/>
							</Link>
							<div className="w-full flex flex-col gap-2">
								<div className="flex items-center gap-2">
									<p className="text-base">{commenter.username}</p>●
									<p className="opacity-75 text-xs">{timeSince(createdAt)}</p>
								</div>
								<p>{body}</p>
							</div>
						</div>
					))}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default Comments;
