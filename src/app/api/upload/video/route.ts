import { uploadToCloudinary } from "@/lib/cloudinary/uploadFile";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	const formData = await req.formData();

	const video = formData.get("video") as unknown as File;

	const { errMessage, result } = await uploadToCloudinary(video, "video");

	if (errMessage) return NextResponse.json({ errMessage });

	const { secure_url, public_id } = result as {
		secure_url: string;
		public_id: string;
	};

	return NextResponse.json({ secure_url, public_id }, { status: 200 });
};
