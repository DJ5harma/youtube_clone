import mongoose, { Schema } from "mongoose";

const USER =
	mongoose.models.USER ||
	mongoose.model(
		"USER",
		new Schema(
			{
				username: {
					type: String,
					required: [true, "Username required"],
				},
				email: {
					type: String,
					required: [true, "Email required"],
				},
				hashedPassword: {
					type: String,
					required: [true, "<hashedPassword> didn't reach"],
				},
				avatar: {
					type: {
						secure_url: String,
						public_id: String,
					},
					default: {
						secure_url: "https://avatars.githubusercontent.com/u/5172592?v=4",
						public_id: "",
					},
				},
				videoRatings: [
					{
						isPositive: Boolean,
						video: { type: Schema.Types.ObjectId, ref: "VIDEO" },
					},
				],
				watchHistory: [
					{
						type: Schema.Types.ObjectId,
						ref: "VIDEO",
					},
				],
			},
			{ timestamps: true }
		)
	);
export default USER;
