import { useUser } from "@/providers/UserProvider";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const LoginForm = () => {
	const { setUser, setShowForm } = useUser();
	const router = useRouter();
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);

	const handleLogin = async () => {
		toast.loading("Signing you in...");
		setLoading(true);
		const { errMessage, user } = (await axios.post("/api/auth/login", form))
			.data;
		toast.dismiss();
		setLoading(false);
		if (errMessage) return toast.error(errMessage);
		setUser(user);
		setShowForm(false);
		if (window.location.href.endsWith("/auth/login")) router.push("/");
		toast.success("Logged In");
	};

	return (
		<>
			<div className="grid gap-4">
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
						{/* <Link
							href="/forgot-password"
							className="ml-auto inline-block text-sm underline"
						>
							Forgot your password?
						</Link> */}
					</div>
					<Input
						id="password"
						type="password"
						required
						onChange={(e) => setForm({ ...form, password: e.target.value })}
					/>
				</div>
				{!loading && (
					<Button type="submit" className="w-full" onClick={handleLogin}>
						Login
					</Button>
				)}
			</div>
		</>
	);
};

export default LoginForm;
