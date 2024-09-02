import { v2 as cloudinary } from "cloudinary";
import { public_cloudname } from "../utils";

cloudinary.config({
	cloud_name: public_cloudname,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
export default cloudinary;
