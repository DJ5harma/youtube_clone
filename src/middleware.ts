// at this point in time, this file is pretty much useless because all the auth-verification is done on specific routes but I'm keeping it incase any need arises

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default function middleware(request: Request) {
	const token = cookies().get("token")?.value; // obtains the auth token (if any) from the cookies

	if (!token) return NextResponse.redirect(new URL("/auth/login", request.url)); // this is just a loose check for innocent users who do not have the auth till now. The real walls for matcher routes are actually defined inside the api route functions so do not worry about security here.
	return NextResponse.next(); // just allow the request to pass
}

export const config = {
	matcher: ["/upload"], // matcher contains the routes for which the middleware to run
};
