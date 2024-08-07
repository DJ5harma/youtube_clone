import mongoose, { Schema } from "mongoose";

const WATCH_HISTORY =
	mongoose.models.WATCH_HISTORY ||
	mongoose.model(
		"WATCH_HISTORY",
		new Schema({
			video: {
				type: Schema.Types.ObjectId,
				ref: "VIDEO",
				required: [true, "Video's _id didn't reach to WatchHistory"],
			},
			user: {
				type: Schema.Types.ObjectId,
				ref: "USER",
				required: [true, "User's _id didn't reach to WatchHistory"],
			},
			lastWatched: {
				type: Date,
				default: Date.now,
			},
		})
	);
export default WATCH_HISTORY;
