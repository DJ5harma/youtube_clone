"use client";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BiUpload } from "react-icons/bi";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { useUser } from "@/app/providers/UserProvider";
import { useRouter } from "next/navigation";

export default function Page() {
	const [form, setForm] = useState({
		username: "",
		password: "",
		confirmPassword: "",
		email: "",
		avatar: { secure_url: "", public_id: "" },
	});
	const handleAvatarUpload = async (image: File) => {
		if (!image) return toast.error("File not selected");
		const formData = new FormData();
		formData.append("image", image);
		toast.loading("Uploading avatar");
		const { errMessage, secure_url, public_id } = (
			await axios.post("/api/upload/image", formData)
		).data;
		toast.dismiss();
		if (errMessage) return toast.error(errMessage);
		setForm({ ...form, avatar: { secure_url, public_id } });
	};
	const { setUser } = useUser();
	const router = useRouter();

	const handleRegister = async () => {
		toast.loading("Signing you up...");
		const { errMessage, user } = (await axios.post("/api/auth/register", form))
			.data;
		toast.dismiss();
		if (errMessage) return toast.error(errMessage);
		setUser(user);
		router.push("/");
		toast.success("Registered");
	};

	return (
		<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<div className="hidden bg-muted lg:block">
				<Image
					src="/next.svg"
					alt="Image"
					width="1920"
					height="1080"
					className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
			<div className="flex items-center justify-center py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					{!form.avatar.secure_url ? (
						<div className="grid gap-2 text-center">
							<h1 className="text-3xl font-bold">Register</h1>
							<p className="text-balance text-muted-foreground">
								Enter your information to create an account
							</p>
						</div>
					) : (
						<Image
							src={form.avatar.secure_url}
							width="1000"
							height="1000"
							alt="image_not_visible"
							className="rounded-full"
						/>
					)}
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="username">Username</Label>
							<Input
								id="username"
								type="username"
								placeholder="e.g.: oggydoggy779"
								required
								onChange={(e) => setForm({ ...form, username: e.target.value })}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
								onChange={(e) => setForm({ ...form, email: e.target.value })}
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
							</div>
							<Input
								id="password"
								type="password"
								required
								onChange={(e) => setForm({ ...form, password: e.target.value })}
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="confirmPassword">Confirm Password</Label>
							</div>
							<Input
								id="confirmPassword"
								type="password"
								required
								onChange={(e) =>
									setForm({ ...form, confirmPassword: e.target.value })
								}
							/>
						</div>
						<Button
							variant="outline"
							className="w-full flex items-center gap-2"
							onClick={() => document.getElementById("avatar-input")?.click()}
						>
							<BiUpload size={20} />
							Avatar
							{" (optional)"}
							<input
								id="avatar-input"
								type="file"
								className="absolute w-0 opacity-0"
								accept=".png, .jpeg, .jpg, .webp"
								onChange={(e) => {
									if (e.target.files) handleAvatarUpload(e.target.files[0]);
								}}
							/>
						</Button>
						<Button onClick={handleRegister} className="w-full">
							Register
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link href="/auth/login" className="underline">
							Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
