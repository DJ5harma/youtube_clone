import { UploadApiResponse } from "cloudinary";
import cloudinary from "./cloudinary";

export const uploadImage = async (
	image: File
): Promise<{ errMessage?: string; result?: UploadApiResponse }> => {
	const buffer = await image.arrayBuffer();
	const bytes = Buffer.from(buffer);

	const folder = "youtube_clone/images";

	return new Promise(async (resolve, reject) => {
		cloudinary.uploader
			.upload_stream(
				{
					resource_type: "auto",
					folder,
				},
				async (err, result) => {
					if (err) return reject({ errMessage: err.message });
					return resolve({ result });
				}
			)
			.end(bytes);
	});
};
