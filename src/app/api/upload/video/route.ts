import { uploadToCloudinary } from "@/lib/cloudinary/uploadFile";
import getUserIdFromJwt from "@/lib/getUserIdFromJwt";
import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	try {
		const user_id = await getUserIdFromJwt();
		if (!user_id) throw new Error("Token missing");

		const formData = await req.formData();

		const video = formData.get("video") as unknown as File;

		if (!video) throw new Error("Video didn't arrive");

		const SIZE_LIMIT = 100 * 1024 * 1024; // 100MB

		if (video.size > SIZE_LIMIT)
			throw new Error("Video size exceeds the limit of 100MB");

		const { errMessage, result } = await uploadToCloudinary(video, "video");

		if (errMessage) throw new Error(errMessage);

		const { secure_url, public_id, duration } = result as {
			secure_url: string;
			public_id: string;
			duration: number;
		};
		console.log({ duration });

		return NextResponse.json(
			{ secure_url, public_id, duration },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json({
			errMessage: (error as Error).message || "Internal server Error",
		});
	}
};
