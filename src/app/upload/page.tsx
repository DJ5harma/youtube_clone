"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiUpload } from "react-icons/bi";

export default function Page() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [thumbnailSecureUrl, setThumbnailSecureUrl] = useState("");

	const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
	const [videoFile, setVideoFile] = useState<File | null>(null);

	const router = useRouter();

	const handleUploads = async () => {
		if (!title) return toast.error("Title is required");
		if (!thumbnailFile) return toast.error("Thumbnail not selected");
		if (!videoFile) return toast.error("Video not selected");

		let formData = new FormData();
		formData.append("image", thumbnailFile);
		toast.loading("Uploading thumbnail");
		const res1 = (await axios.post("/api/upload/image", formData)).data;
		toast.dismiss();
		if (res1.errMessage) return toast.error(res1.errMessage);

		const thumbnail = {
			secure_url: res1.secure_url,
			public_id: res1.public_id,
		};
		setThumbnailSecureUrl(thumbnail.secure_url);

		formData = new FormData();
		formData.append("video", videoFile);
		toast.loading("Uploading video");
		const res2 = (await axios.post("/api/upload/video", formData)).data;
		toast.dismiss();
		if (res2.errMessage) return toast.error(res2.errMessage);
		const video = {
			secure_url: res2.secure_url,
			public_id: res2.public_id,
			duration: res2.duration,
		};

		const { errMessage } = (
			await axios.post("/api/upload", {
				title,
				description,
				thumbnail,
				video,
			})
		).data;
		if (errMessage) return toast.error(errMessage);
		toast.success("Upload successful");
		router.replace("/");
	};

	return (
		<div className="flex flex-col gap-2 items-center p-4">
			{thumbnailSecureUrl && (
				<Image
					src={thumbnailSecureUrl}
					width="1280"
					height="720"
					alt="image_not_visible"
					className="rounded-full w-1/2"
				/>
			)}
			<Button variant="outline" className="w-full">
				<div className="absolute flex items-center gap-2">
					<BiUpload size={20} />
					{thumbnailFile
						? thumbnailFile.name.slice(0, 20) + "... _ tap to replace"
						: "Thumbnail Max : 10MB"}
				</div>
				<input
					type="file"
					accept=".png, .jpeg, .jpg, .webp"
					className="border-2 h-full w-full opacity-0 cursor-pointer"
					onChange={(e) => {
						if (e.target.files) setThumbnailFile(e.target.files[0]);
						console.log(e.target.files?.item(0)?.name);
					}}
				/>
			</Button>
			<Button variant="outline" className="w-full">
				<div className="absolute flex items-center gap-2">
					<BiUpload size={20} />
					{videoFile
						? videoFile.name.slice(0, 20) + "... _ tap to replace"
						: "Video Max: 100MB"}
				</div>
				<input
					type="file"
					accept=".mp4, .mkv, .webm"
					className="border-2 h-full w-full opacity-0 cursor-pointer"
					onChange={(e) => {
						if (e.target.files) setVideoFile(e.target.files[0]);
						console.log(e.target.files);
					}}
				/>
			</Button>

			<Input
				placeholder="Title"
				onChange={(e) => setTitle(e.target.value)}
				className="text-center w-2/3"
			/>
			<Textarea
				placeholder="Description"
				onChange={(e) => setDescription(e.target.value)}
				className="text-center"
			/>
			<Button className="w-2/3" onClick={handleUploads}>
				Upload
			</Button>
		</div>
	);
}
