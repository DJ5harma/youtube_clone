"use client";
import { useUser } from "@/providers/UserProvider";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const DialogForm = () => {
	const { setShowForm } = useUser();
	return (
		<Dialog defaultOpen>
			{/* <DialogTrigger asChild>
				<Button variant="outline">Edit Profile</Button>
			</DialogTrigger> */}
			<DialogContent className="">
				<Tabs defaultValue="Register" className="w-full">
					<div className="w-full flex justify-center mb-4">
						<DialogTitle>
							<TabsList className="flex justify-center w-fit">
								<TabsTrigger value="Login">Login</TabsTrigger>
								<TabsTrigger value="Register">Register</TabsTrigger>
							</TabsList>
						</DialogTitle>
					</div>
					<TabsContent value="Login">
						<LoginForm />
					</TabsContent>
					<TabsContent value="Register">
						<RegisterForm />
					</TabsContent>
				</Tabs>

				<DialogFooter>
					<Button
						type="submit"
						variant="secondary"
						onClick={() => setShowForm(false)}
					>
						Or remain as guest
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
export default DialogForm;
