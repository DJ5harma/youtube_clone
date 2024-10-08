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
import { useUser } from "@/providers/UserProvider";
import toast from "react-hot-toast";
import CustomTooltip from "../Nav/CustomTooltip";
import axios from "axios";

// the functionality here will work in similar fashion to the SubscribeSection component (updating the db after showing the response to the user asap)

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

	const { user, setShowForm } = useUser();

	const updateRatingTo = async (
		val: "LIKE" | "DISLIKE" | "UNLIKE" | "UNDISLIKE"
	) => {
		if (!user?._id) {
			setShowForm(true);
			return toast.error("Sign in to " + val.toLowerCase());
		} // a loose user's id check to save bandwidth

		let todo:
			| "LIKE"
			| "DISLIKE"
			| "UNLIKE"
			| "UNDISLIKE"
			| "LIKE_TO_DISLIKE"
			| "DISLIKE_TO_LIKE"
			| "" = ""; // the actions which are possible

		if (val === "LIKE") {
			if (shownUserRating === -1) {
				todo = "DISLIKE_TO_LIKE";
				setShownDislikes(shownDislikes - 1);
			} else todo = "LIKE";

			setShownLikes(shownLikes + 1);
			setShownUserRating(+1);
		} else if (val === "DISLIKE") {
			if (shownUserRating === +1) {
				todo = "LIKE_TO_DISLIKE";
				setShownLikes(shownLikes - 1);
			} else todo = "DISLIKE";

			setShownDislikes(shownDislikes + 1);
			setShownUserRating(-1);
		} else if (val === "UNLIKE" || val === "UNDISLIKE") {
			if (val === "UNLIKE") setShownLikes(shownLikes - 1);
			else if (val === "UNDISLIKE") setShownDislikes(shownDislikes - 1);
			setShownUserRating(0);
			todo = val;
		}

		if (!todo) return toast.error("Error! developer's fault");

		const { errMessage } = (
			await axios.post("/api/videos/updateRating", { todo, video_id })
		).data; // update the rating of this user on this video. The api route handles the rest

		if (errMessage) toast.error(errMessage);
	};

	return (
		<div className="flex items-center [&>*]:rounded-full overflow-y-hidden gap-2">
			<div className="items-center flex gap-1 border px-4 p-1">
				{shownUserRating === 1 && user._id ? (
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
				{shownUserRating === -1 && user._id ? (
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
								.writeText(window.location.href) // just copies the specified string (href) to client's clipboard
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
