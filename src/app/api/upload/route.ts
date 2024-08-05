import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import VIDEO from "@/models/VIDEO.model";

export const POST = async (req: NextRequest) => {
	try {
		const token = cookies().get("token")?.value;
		if (!token) throw new Error("token missing");
		const { user_id } = jwt.verify(token, process.env.JWT_SECRET!) as {
			user_id: string;
		};

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
