import { NextRequest, NextResponse } from "next/server";

export const POST = (req: NextRequest) => {
	console.log("route");
	return NextResponse.json({});
};
