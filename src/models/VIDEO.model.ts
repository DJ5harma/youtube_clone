import mongoose, { Schema } from "mongoose";

const VIDEO =
	mongoose.models.VIDEO ||
	mongoose.model(
		"VIDEO",
		new Schema(
			{
				title: {
					type: String,
					required: [true, "Title required"],
				},
				description: {
					type: String,
					default: "",
				},
				creator: { type: Schema.Types.ObjectId, ref: "USER" },
				thumbnail: {
					type: {
						secure_url: String,
						public_id: String,
					},
					required: true,
					_id: false,
				},
				video: {
					type: {
						secure_url: String,
						public_id: String,
						duration: Number,
					},
					required: true,
					_id: false,
				},
				views: { type: Number, default: 0 },
				likes: { type: Number, default: 0 },
				dislikes: { type: Number, default: 0 },
			},
			{ timestamps: true }
		)
	);
export default VIDEO;
