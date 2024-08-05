import dbConnect from "@/lib/dbConnect";
import USER from "@/models/USER.model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
	try {
		const { username, password, email, avatar } = await req.json();
		console.log();

		if (password.length < 6) throw new Error("Password too short");
		if (await USER.findOne({ email }))
			throw new Error("Email already registered");

		const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
		await dbConnect();
		const user = new USER({
			username,
			hashedPassword,
			email,
			avatar,
		});
		const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET!);
		cookies().set("token", token);
		cookies().set("user_id", user._id);
		await user.save();
		return NextResponse.json({
			user: {
				_id: user._id,
				username,
				email,
				avatar,
			},
		});
	} catch (error) {
		return NextResponse.json({
			errMessage: (error as Error).message || "Internal server Error",
		});
	}
};
