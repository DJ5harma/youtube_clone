import mongoose from "mongoose";

const { MONGO_URI } = process.env;

let isConnected = false;

export default async function dbConnect() {
	if (isConnected) return;

	try {
		if (!MONGO_URI) throw new Error("MONGO_URI not detected");
		const db = await mongoose.connect(MONGO_URI);

		// if (!mongoose.models.User) mongoose.model("User", User.schema);

		isConnected = db.connections[0].readyState === 1;
	} catch (error) {
		console.error("Could not connect to MongoDB", error);
		throw new Error("Could not connect to MongoDB");
	}
}
