import { UploadApiResponse } from "cloudinary";
import cloudinary from "./cloudinary";
import { CVideoUploadApiResponse } from "../types";

export const uploadToCloudinary = async (
	file: File,
	fileType: "video" | "image"
): Promise<{
	errMessage?: string;
	result?: UploadApiResponse | CVideoUploadApiResponse;
}> => {
	const buffer = await file.arrayBuffer();
	const bytes = Buffer.from(buffer);

	const folder = `youtube_clone/${fileType}s`;

	return new Promise(async (resolve, reject) => {
		cloudinary.uploader
			.upload_stream(
				{
					resource_type: fileType,
					folder,
				},
				async (err, result) => {
					console.log({ err, result });

					if (err) return reject({ errMessage: err.message });
					return resolve({ result });
				}
			)
			.end(bytes);
	});
};
