"use client";
import DialogForm from "@/components/Auth/DialogForm";
import { CUser } from "@/lib/types";
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

export const sampleUser: CUser = {
	_id: "",
	username: "Guest",
	email: "Not signed in",
	avatar: { secure_url: "", public_id: "" },
}; // this is just an object acting as a placeholder for logged-in users' details

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
}); // this context will store the actual state of the current user and also a boolean to act as a toggle to show the auth-form which may be called from anywhere in the chldren routes of the below-written context-provider

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<CUser>(sampleUser);
	const [showForm, setShowForm] = useState(false);

	const autoLogin = async () => {
		if (
			window.location.href.endsWith("/auth/login") ||
			window.location.href.endsWith("/auth/register")
		)
			return; // don't try to auto-login if the user is already on the pages to login/register as the user may be trying to switch accounts manually
		const cookies = document.cookie.split("=");
		let token = "";
		for (let i = 0; i < cookies.length; i++)
			if (cookies[i] === "token") {
				token = cookies[i + 1];
				break;
			}
		// the split fn and the loop above will extract the token out of cookies

		if (!token) return setShowForm(true); // show the auth-form if there exists no auth-token

		toast.loading("Logging you in...");

		const { errMessage, user } = (await axios.get("/api/auth/login")).data; // get the results back from api which handles the login (in the login file inside api/auth, I've defined two methods: a POST and a GET. The GET method handles the auto-login-logic and the other one handles manual login-logic)

		toast.dismiss(); // stop the auto-login-loading

		if (!user || errMessage) return toast.error(errMessage);

		setUser(user); // update the state with user's details

		toast.success(`Logged in automatically as ${user.username}`);
	};

	useEffect(() => {
		autoLogin();
	}, []); // run once and try to auto-login

	return (
		<context.Provider value={{ user, setUser, showForm, setShowForm }}>
			{
				showForm && <DialogForm />
				// the DialogForm is a custom hovering form which'll allow users to sign-in without actually redirecting to the specific-auth pages
			}
			{children}
		</context.Provider>
	);
};

export const useUser = () => {
	return useContext(context);
}; // just a handy util I made to use instead of using useContext and also init, specifying the context itself everytime (1 < 2)
