import dbConnect from "@/lib/dbConnect";
import getUserIdFromJwt from "@/lib/getUserIdFromJwt";
import USER from "@/models/USER.model";
import VIDEO from "@/models/VIDEO.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	try {
		const user_id = await getUserIdFromJwt();
		if (!user_id) throw new Error("Token missing");
		const {
			video_id,
			todo,
		}: {
			video_id: string;
			todo:
				| "LIKE"
				| "DISLIKE"
				| "UNLIKE"
				| "UNDISLIKE"
				| "LIKE_TO_DISLIKE"
				| "DISLIKE_TO_LIKE";
		} = await req.json();
		await dbConnect();

		if (todo === "LIKE" || todo === "DISLIKE") {
			await USER.updateOne(
				{ _id: user_id },
				{
					$push: {
						videoRatings: {
							isPositive: todo === "LIKE" ? true : false,
							video: new mongoose.Types.ObjectId(video_id),
						},
					},
				}
			);
			await VIDEO.updateOne(
				{ _id: video_id },
				{
					$inc: todo === "LIKE" ? { likes: +1 } : { dislikes: +1 },
				}
			);
		} else if (todo === "UNLIKE" || todo === "UNDISLIKE") {
			await USER.updateOne(
				{ _id: user_id },
				{
					$pull: {
						videoRatings: {
							video: new mongoose.Types.ObjectId(video_id),
						},
					},
				}
			);
			await VIDEO.updateOne(
				{ _id: video_id },
				{
					$inc: todo === "UNLIKE" ? { likes: -1 } : { dislikes: -1 },
				}
			);
		} else if (todo === "LIKE_TO_DISLIKE" || todo === "DISLIKE_TO_LIKE") {
			await USER.updateOne(
				{ _id: user_id, "videoRatings.video": video_id },
				{
					$set: {
						"videoRatings.$.isPositive":
							todo === "DISLIKE_TO_LIKE" ? true : false,
					},
				}
			);
			await VIDEO.updateOne(
				{ _id: video_id },
				{
					$inc:
						todo === "DISLIKE_TO_LIKE"
							? { likes: +1, dislikes: -1 }
							: { likes: -1, dislikes: +1 },
				}
			);
		}
		return NextResponse.json({});
	} catch (error) {
		return NextResponse.json({
			errMessage: (error as Error).message || "Internal server Error",
		});
	}
};
