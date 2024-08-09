"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@/providers/UserProvider";

export default function ErrorComponent({
	message,
	showForm,
}: {
	message?: string;
	showForm?: boolean;
}) {
	const { setShowForm } = useUser();

	return (
		<div className="w-full h-full flex justify-center">
			<h1 className="p-2 text-2xl font-semibold flex gap-2 flex-col items-center">
				{" : " +
					(message ||
						"Either you need an account here or I've not implemented this page yet") +
					" : "}
				<Link href="/">
					<Button>Go Home</Button>
				</Link>
				{showForm && (
					<>
						or
						<Button onClick={() => setShowForm(true)}>Register / Login</Button>
					</>
				)}
			</h1>
		</div>
	);
}
