import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BiUpload } from "react-icons/bi";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { useUser } from "@/providers/UserProvider";
import { useRouter } from "next/navigation";
import Image from "next/image";

const RegisterForm = () => {
	const [form, setForm] = useState({
		username: "",
		password: "",
		confirmPassword: "",
		email: "",
		avatar: { secure_url: "", public_id: "" },
	});

	const { setUser, setShowForm } = useUser();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleAvatarUpload = async (image: File) => {
		if (!image) return toast.error("File not selected");
		const formData = new FormData();
		formData.append("image", image);
		toast.loading("Uploading avatar");
		setLoading(true);
		const { errMessage, secure_url, public_id } = (
			await axios.post("/api/upload/image", formData)
		).data;
		toast.dismiss();
		setLoading(false);
		if (errMessage) return toast.error(errMessage);
		setForm({ ...form, avatar: { secure_url, public_id } });
		setShowForm(false);
		toast.success("Registered");
	};

	const handleRegister = async () => {
		if (form.password !== form.confirmPassword)
			return toast.error("The passwords must match");
		if (form.password.length < 6)
			return toast.error("The password must have atleast 6 characters");
		toast.loading("Signing you up...");
		setLoading(true);
		const { errMessage, user } = (await axios.post("/api/auth/register", form))
			.data;
		toast.dismiss();
		if (errMessage) {
			setLoading(false);
			return toast.error(errMessage);
		}
		setUser(user);
		if (window.location.href.endsWith("/auth/login")) router.push("/");
		toast.success("Registered");
	};
	return (
		<div className="w-full h-full flex justify-around gap-4">
			{!form.avatar.secure_url && (
				<Image
					src={form.avatar.secure_url || "/profile.png"}
					width="300"
					height="300"
					alt="image_not_visible"
					className="rounded-full max-h-20 max-w-20"
				/>
			)}
			<div className="grid gap-4 w-full">
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
						placeholder="min 6 characters"
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
						placeholder="same as Password"
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
				{!loading && (
					<Button onClick={handleRegister} className="w-full">
						Register
					</Button>
				)}
			</div>
		</div>
	);
};

export default RegisterForm;
