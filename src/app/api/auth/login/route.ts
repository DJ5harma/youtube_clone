import dbConnect from "@/lib/dbConnect";
import USER from "@/models/USER.model";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
	try {
		await dbConnect();
		const { password, email } = await req.json();
		const user = await USER.findOne({ email })
			.select("_id username avatar email")
			.populate("avatar");
		if (!user) throw new Error("Email not registered");
		if (!bcrypt.compareSync(password, user.hashedPassword))
			throw new Error("Incorrect password");

		const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET!);
		cookies().set("token", token);
		cookies().set("user_id", user._id);

		return NextResponse.json({ user });
	} catch (error) {
		return NextResponse.json({
			errMessage: (error as Error).message || "Internal server Error",
		});
	}
};

export const GET = async () => {
	try {
		const token = cookies().get("token")?.value;
		const user_id = cookies().get("user_id")?.value;
		if (!token || jwt.verify(token, process.env.JWT_SECRET!) !== user_id)
			throw new Error();
		const user = await USER.findById(user_id)
			.select("_id username avatar email")
			.populate("avatar");
		return NextResponse.json({ user });
	} catch (error) {
		return NextResponse.json({});
	}
};
