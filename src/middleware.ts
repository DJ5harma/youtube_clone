// import { NextResponse } from "next/server";

export default function middleware(request: Request) {
	console.log("middleware");

	// return NextResponse.redirect(new URL("/", request.url));
}

// export const config = {
// 	matcher: [],
// };
