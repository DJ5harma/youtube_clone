import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
	try {
		cookies().delete("token");
		return NextResponse.json({});
	} catch (error) {
		return NextResponse.json({ errMessage: (error as Error).message });
	}
};
