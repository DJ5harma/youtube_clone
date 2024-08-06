import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import VIDEO from "@/models/VIDEO.model";
import getUserIdFromJwt from "@/lib/getUserIdFromJwt";

export const POST = async (req: NextRequest) => {
	try {
		const user_id = getUserIdFromJwt(cookies().get("token")?.value);
		if (!user_id) throw new Error("token missing");

		const videoDoc = await req.json();
		videoDoc.creator = user_id;

		await dbConnect();
		await VIDEO.create(videoDoc);

		console.log({ videoDoc });
		return NextResponse.json({});
	} catch (error) {
		return NextResponse.json({
			errMessage: (error as Error).message || "Internal server Error",
		});
	}
};
