import { uploadToCloudinary } from "@/lib/cloudinary/uploadFile";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	const formData = await req.formData();

	const image = formData.get("image") as unknown as File;

	const { errMessage, result } = await uploadToCloudinary(image, "image");

	if (errMessage) return NextResponse.json({ errMessage });

	const { secure_url, public_id } = result as {
		secure_url: string;
		public_id: string;
	};

	return NextResponse.json({ secure_url, public_id }, { status: 200 });
};
