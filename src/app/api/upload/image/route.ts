import { uploadToCloudinary } from "@/lib/cloudinary/uploadFile";
import getUserIdFromJwt from "@/lib/getUserIdFromJwt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	try {
		const user_id = await getUserIdFromJwt();
		if (!user_id) throw new Error("Token missing");

		const formData = await req.formData();

		const image = formData.get("image") as unknown as File;

		if (!image) throw new Error("Image didn't arrive");

		const SIZE_LIMIT = 10 * 1024 * 1024; // 10MB

		if (image.size > SIZE_LIMIT)
			throw new Error("Image size exceeds the limit of 5MB");

		const { errMessage, result } = await uploadToCloudinary(image, "image");

		if (errMessage) throw new Error(errMessage);

		const { secure_url, public_id } = result as {
			secure_url: string;
			public_id: string;
		};

		return NextResponse.json({ secure_url, public_id }, { status: 200 });
	} catch (error) {
		return NextResponse.json({
			errMessage: (error as Error).message || "Internal server Error",
		});
	}
};
