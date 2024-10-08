import dbConnect from "@/lib/dbConnect";
import USER from "@/models/USER.model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import getUserIdFromJwt from "@/lib/getUserIdFromJwt";

export const POST = async (req: NextRequest) => {
	try {
		const { password, email } = await req.json();

		await dbConnect();
		const user = await USER.findOne({ email })
			.select("_id username avatar email hashedPassword")
			.populate("avatar");
		if (!user) throw new Error("Email not registered");
		if (!bcrypt.compareSync(password, user.hashedPassword))
			throw new Error("Incorrect password");

		const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET!);

		cookies().set("token", token);

		return NextResponse.json({ user });
	} catch (error) {
		return NextResponse.json({
			errMessage: (error as Error).message || "Internal server error",
		});
	}
};

export const GET = async () => {
	try {
		const user_id = await getUserIdFromJwt();
		if (!user_id) throw new Error();
		await dbConnect();
		const user = await USER.findById(user_id)
			.select("_id username avatar email")
			.populate("avatar");

		return NextResponse.json({ user });
	} catch (error) {
		return NextResponse.json({
			errMessage: (error as Error).message || "Internal server error",
		});
	}
};
