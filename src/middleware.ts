import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default function middleware(request: Request) {
	const token = cookies().get("token")?.value;
	console.log({ token }, ": middleware");

	if (!token) return NextResponse.redirect(new URL("/auth/login", request.url));
	return NextResponse.next();
}

// export const config = {
// 	matcher: [],
// };
