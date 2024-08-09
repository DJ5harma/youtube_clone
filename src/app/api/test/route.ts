import { NextResponse } from "next/server";

export const GET = () => {
	return NextResponse.json({
		server: "works",
		environment: process.env.NODE_ENV,
	});
};
