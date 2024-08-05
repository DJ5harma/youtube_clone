import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default function middleware(request: Request) {
	console.log("middleware");
	const token = cookies().get("token");
	return NextResponse.redirect(new URL("/auth/login", request.url));
}

// export const config = {
// 	matcher: [],
// };
