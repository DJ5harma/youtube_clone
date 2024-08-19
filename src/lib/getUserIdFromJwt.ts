"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function getUserIdFromJwt(): Promise<string | undefined> {
	try {
		const token = cookies().get("token")?.value;
		if (!token) return undefined;
		const { user_id } = jwt.verify(token, process.env.JWT_SECRET!) as {
			user_id: string;
		};
		return user_id;
	} catch (error) {
		return undefined;
	}
} // this will test the auth-token from the user's cookie. If the token is valid, the _id of the USER (inside MongoDB) will be returned and nothing (undefined) will be returned in case the token is invalid.
