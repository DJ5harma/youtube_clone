import dbConnect from "@/lib/dbConnect";
// import VIDEO from "@/models/VIDEO.model";
import { NextResponse } from "next/server";

export const GET = async () => {
	try {
		// await dbConnect();
		console.log("hello");

		// const videos = await VIDEO.find().limit(10);
		return NextResponse.json({ videos: [] });
	} catch (error) {
		return NextResponse.json({
			errMessage: (error as Error).message || "Internal Server Error",
		});
	}
};
