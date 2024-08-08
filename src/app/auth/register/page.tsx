"use client";
import RegisterForm from "@/components/Auth/RegisterForm";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
	return (
		<div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<div className="hidden bg-muted lg:block">
				<Image
					src="/next.svg"
					alt="Image"
					width="1920"
					height="1080"
					className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
			<div className="flex items-start justify-center py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Register</h1>
						<p className="text-balance text-muted-foreground">
							Enter your information to create an account
						</p>
					</div>
					<RegisterForm />
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link href="/auth/login" className="underline">
							Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
