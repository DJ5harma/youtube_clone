import dbConnect from "@/lib/dbConnect";
import getUserIdFromJwt from "@/lib/getUserIdFromJwt";
import USER from "@/models/USER.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	try {
		const user_id = await getUserIdFromJwt();
		if (!user_id) throw new Error("Token missing");
		const { creator_id, todo } = await req.json();
		await dbConnect();

		if (todo === "SUBSCRIBE") {
			await USER.updateOne(
				{ _id: user_id },
				{ $push: { subscriptions: new mongoose.Types.ObjectId(creator_id) } }
			);
			await USER.updateOne({ _id: creator_id }, { $inc: { subscribers: +1 } });
		} else if (todo === "UNSUBSCRIBE") {
			await USER.updateOne(
				{ _id: user_id },
				{ $pull: { subscriptions: new mongoose.Types.ObjectId(creator_id) } }
			);
			await USER.updateOne({ _id: creator_id }, { $inc: { subscribers: -1 } });
		}

		return NextResponse.json({});
	} catch (error) {
		return NextResponse.json({
			errMessage: (error as Error).message || "Internal server Error",
		});
	}
};
