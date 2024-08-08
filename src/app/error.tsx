"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@/providers/UserProvider";

export default function Error({
	error,
}: {
	error: Error & { digest?: string };
}) {
	const { setShowForm } = useUser();
	return (
		<>
			<h1 className="p-2 text-2xl font-semibold flex gap-2">
				{(error.message ||
					"Either you need an account here or I've not implemented this page yet") +
					" : "}
				<Link href="/">
					<Button>Go Home</Button>
				</Link>
				or
				<Button onClick={() => setShowForm(true)}>Register / Login</Button>
			</h1>
		</>
	);
}
