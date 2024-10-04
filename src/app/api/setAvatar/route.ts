import dbConnect from "@/lib/dbConnect";
import USER from "@/models/USER.model";
import { NextRequest, NextResponse } from "next/server";
import getUserIdFromJwt from "@/lib/getUserIdFromJwt";

export const POST = async (req: NextRequest) => {
	try {
		const avatar = await req.json();
		const user_id = await getUserIdFromJwt();
		if (!user_id) throw new Error("Token is missing!");

		await dbConnect();
		await USER.findByIdAndUpdate(user_id, { avatar });
		return NextResponse.json({});
	} catch (error) {
		return NextResponse.json({
			errMessage: (error as Error).message || "Internal server error",
		});
	}
};
