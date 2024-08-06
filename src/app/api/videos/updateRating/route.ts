import dbConnect from "@/lib/dbConnect";
import getUserIdFromJwt from "@/lib/getUserIdFromJwt";
import USER from "@/models/USER.model";
import VIDEO from "@/models/VIDEO.model";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	try {
		const user_id = getUserIdFromJwt(cookies().get("token")?.value);
		if (!user_id) throw new Error("Token missing");
		const {
			video_id,
			todo,
		}: { video_id: string; todo: "LIKE" | "DISLIKE" | "UNLIKE" | "UNDISLIKE" } =
			await req.json();
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
			if (todo === "LIKE")
				await VIDEO.updateOne(
					{ _id: video_id },
					{
						$inc: { likes: +1 },
					}
				);
			else
				await VIDEO.updateOne(
					{ _id: video_id },
					{
						$inc: { dislikes: +1 },
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
			if (todo === "UNLIKE")
				await VIDEO.updateOne(
					{ _id: video_id },
					{
						$inc: { likes: -1 },
					}
				);
			else
				await VIDEO.updateOne(
					{ _id: video_id },
					{
						$inc: { dislikes: -1 },
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
