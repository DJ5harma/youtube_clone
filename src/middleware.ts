import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default function middleware(request: Request) {
	console.log("middleware");
	const token = cookies().get("token")?.value;
	if (!token) return NextResponse.redirect(new URL("/auth/login", request.url));
	const { user_id } = jwt.verify(token, process.env.JWT_SECRET!) as {
		user_id: string;
	};
	if (!user_id)
		return NextResponse.redirect(new URL("/auth/login", request.url));
	return NextResponse.next();
}

export const config = {
	matcher: [],
};
