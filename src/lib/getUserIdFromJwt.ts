import jwt from "jsonwebtoken";

export default function getUserIdFromJwt(
	token: string | undefined
): string | undefined {
	if (!token) return undefined;
	const { user_id } = jwt.verify(token, process.env.JWT_SECRET!) as {
		user_id: string;
	};
	return user_id;
}
