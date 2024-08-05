"use client";

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
}>({
	user: sampleUser,
	setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<CUser>(sampleUser);
	const autoLogin = async () => {
		toast.loading("Auto logging...");
		const { user } = (await axios.get("/api/auth/login")).data;
		toast.dismiss();
		console.log({ user });

		if (!user) return;
		setUser(user);
		toast.success("Logged in automatically");
	};
	useEffect(() => {
		autoLogin();
	}, []);
	return (
		<context.Provider value={{ user, setUser }}>{children}</context.Provider>
	);
};

export const useUser = () => {
	return useContext(context);
};
