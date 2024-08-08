"use client";
import DialogForm from "@/components/Auth/DialogForm";
import axios from "axios";
import React, {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";
import toast from "react-hot-toast";

export interface CUser {
	_id: string;
	email: string;
	username: string;
	avatar: { secure_url: string; public_id: string };
}
export const sampleUser: CUser = {
	_id: "",
	username: "Guest",
	email: "Not signed in",
	avatar: { secure_url: "", public_id: "" },
};
const context = createContext<{
	user: CUser;
	setUser: Dispatch<SetStateAction<CUser>>;
	setShowForm: Dispatch<SetStateAction<boolean>>;
	showForm: boolean;
}>({
	user: sampleUser,
	setUser: () => {},
	showForm: false,
	setShowForm: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<CUser>(sampleUser);
	const [showForm, setShowForm] = useState(false);

	const autoLogin = async () => {
		const cookies = document.cookie.split("=");
		let token = "";
		for (let i = 0; i < cookies.length; i++)
			if (cookies[i] === "token") {
				token = cookies[i + 1];
				break;
			}
		if (!token) return setShowForm(true);
		toast.loading("Logging you in...");
		const { errMessage, user } = (await axios.get("/api/auth/login")).data;
		toast.dismiss();
		if (!user || errMessage) return toast.error(errMessage);
		setUser(user);
		toast.success(`Logged in automatically as ${user.username}`);
	};
	useEffect(() => {
		if (
			window.location.href.endsWith("/auth/login") ||
			window.location.href.endsWith("/auth/register")
		)
			return;
		autoLogin();
	}, []);
	return (
		<context.Provider value={{ user, setUser, showForm, setShowForm }}>
			{showForm && <DialogForm />}
			{children}
		</context.Provider>
	);
};

export const useUser = () => {
	return useContext(context);
};
