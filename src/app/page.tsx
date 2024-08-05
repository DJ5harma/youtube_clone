"use client";
import axios from "axios";
import React, { FormEvent, useState } from "react";

export default function Page() {
	const handleSubmit = async (image: File) => {
		if (!image) {
			return;
		}
		const formData = new FormData();
		formData.append("image", image);
		const res = await axios.post("/api/upload/image", formData);

		const data = await res.data;
		console.log({ data });
		// const res = await axios.post("/api/test", { hello: "HELLO" });
	};

	return (
		<form>
			<input
				onChange={(e) => {
					if (e.target.files) handleSubmit(e.target.files[0]);
				}}
				type="file"
				name=""
				id=""
				className="border-2 w-20 h-20 rounded-full absolute top-10"
			/>
			<button type="submit">upload</button>
		</form>
	);
}
