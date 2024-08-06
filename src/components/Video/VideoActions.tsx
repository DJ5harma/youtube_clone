"use client";
import React from "react";
import {
	BiDislike,
	BiLike,
	BiLink,
	BiSolidDislike,
	BiSolidLike,
} from "react-icons/bi";
import { CiMenuKebab } from "react-icons/ci";
import { useUser } from "@/app/providers/UserProvider";
import toast from "react-hot-toast";
import CustomTooltip from "../Nav/CustomTooltip";
import axios from "axios";

const VideoActions = ({
	likes,
	dislikes,
	userRating,
	video_id,
}: {
	likes: number;
	dislikes: number;
	userRating: 1 | -1 | 0;
	video_id: string;
}) => {
	const [shownLikes, setShownLikes] = React.useState(likes);
	const [shownDislikes, setShownDislikes] = React.useState(dislikes);
	const [shownUserRating, setShownUserRating] = React.useState<1 | -1 | 0>(
		userRating
	);

	const { user } = useUser();

	const updateRatingTo = async (
		todo: "LIKE" | "DISLIKE" | "UNLIKE" | "UNDISLIKE"
	) => {
		if (!user?.email) return toast.error("SignIn to rate");
		switch (todo) {
			case "LIKE":
				if (shownUserRating === -1) setShownDislikes((p) => p - 1);
				setShownLikes((p) => p + 1);
				setShownUserRating(1);
				break;
			case "DISLIKE":
				if (shownUserRating === 1) setShownLikes((p) => p - 1);
				setShownDislikes((p) => p + 1);
				setShownUserRating(-1);
				break;
			case "UNLIKE":
				setShownLikes((p) => p - 1);
				setShownUserRating(0);
				break;
			case "UNDISLIKE":
				setShownDislikes((p) => p - 1);
				setShownUserRating(0);
				break;
		}
		const { errMessage } = (
			await axios.post("/api/videos/updateRating", { todo, video_id })
		).data;
		if (errMessage) toast.error(errMessage);
	};

	return (
		<div className="flex items-center [&>*]:rounded-full overflow-y-hidden gap-2">
			<div className="items-center flex gap-1 border px-4 h-full">
				{shownUserRating === 1 ? (
					<>
						<CustomTooltip
							icon={<BiSolidLike onClick={() => updateRatingTo("UNLIKE")} />}
							text={`${shownLikes} likes`}
							size={30}
						/>
					</>
				) : (
					<CustomTooltip
						icon={<BiLike onClick={() => updateRatingTo("LIKE")} />}
						text={`${shownLikes} likes`}
						size={30}
					/>
				)}
				<p className="text-sm font-medium">{shownLikes}</p>
				<p className="text-2xl mx-1">|</p>
				{shownUserRating === -1 ? (
					<CustomTooltip
						icon={
							<BiSolidDislike onClick={() => updateRatingTo("UNDISLIKE")} />
						}
						text={`${shownDislikes} dislikes`}
						size={30}
					/>
				) : (
					<CustomTooltip
						icon={<BiDislike onClick={() => updateRatingTo("DISLIKE")} />}
						text={`${shownDislikes} dislikes`}
						size={30}
					/>
				)}
				<p className="text-sm font-medium">{shownDislikes}</p>
			</div>
			<CustomTooltip
				icon={
					<BiLink
						onClick={() =>
							navigator.clipboard
								.writeText(window.location.href)
								.then(() => toast.success("Link copied to clipboard!"))
						}
					/>
				}
				text="Copy link"
				size={30}
			/>
			<CustomTooltip
				icon={<CiMenuKebab className="rotate-90" />}
				text="Options"
				size={30}
			/>
		</div>
	);
};

export default VideoActions;
