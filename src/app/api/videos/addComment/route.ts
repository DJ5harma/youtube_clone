import dbConnect from "@/lib/dbConnect";
import getUserIdFromJwt from "@/lib/getUserIdFromJwt";
import COMMENT from "@/models/COMMENT.model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	try {
		const user_id = getUserIdFromJwt(cookies().get("token")?.value);
		if (!user_id) throw new Error("Token missing");
		const { video_id, body }: { video_id: string; body: string } =
			await req.json();
		await dbConnect();
		await COMMENT.create({
			video: video_id,
			body,
			commenter: user_id,
		});
		return NextResponse.json({});
	} catch (error) {
		return NextResponse.json({
			errMessage: (error as Error).message || "Internal server Error",
		});
	}
};
