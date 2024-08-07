import mongoose, { Schema } from "mongoose";

const COMMENT =
	mongoose.models.COMMENT ||
	mongoose.model(
		"COMMENT",
		new Schema(
			{
				video: {
					type: Schema.Types.ObjectId,
					ref: "VIDEO",
				},
				body: {
					type: String,
					required: [true, "Comment body required"],
				},
				commenter: { type: Schema.Types.ObjectId, ref: "USER" },
				likes: { type: Number, default: 0 },
				dislikes: { type: Number, default: 0 },
			},
			{ timestamps: true }
		)
	);
export default COMMENT;
