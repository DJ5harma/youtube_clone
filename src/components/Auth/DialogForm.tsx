"use client";
import { useUser } from "@/providers/UserProvider";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	// DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

// This form (and/will) appear hovering on any page when triggered by the showForm state so that users can sign in without leaving the page they are currently in

const DialogForm = () => {
	const { showForm, setShowForm } = useUser();
	if (!showForm) return <></>;
	return (
		<div onClick={() => setShowForm(false)}>
			<Dialog open>
				{/* <DialogTrigger asChild>
				<Button variant="outline">Edit Profile</Button>
				</DialogTrigger> */}
				{/* <div
				className="absolute top-0 left-0 w-screen h-screen bg-red-700 z-50"
				onClick={() => setShowForm(false)}
				></div> */}
				<DialogContent onClick={(e) => e.stopPropagation()} className="p-0">
					<DialogDescription className="hidden"></DialogDescription>
					<Tabs defaultValue="Register" className="w-full p-4">
						<DialogTitle>
							<div className="w-full flex justify-center mb-4">
								<TabsList className="flex justify-center w-full z-10">
									<TabsTrigger value="Login">Login</TabsTrigger>
									<TabsTrigger value="Register">Register</TabsTrigger>
								</TabsList>
							</div>
						</DialogTitle>
						<TabsContent value="Login">
							<LoginForm />
						</TabsContent>
						<TabsContent value="Register">
							<RegisterForm />
						</TabsContent>
						<DialogFooter>
							<Button
								type="submit"
								variant="secondary"
								onClick={() => setShowForm(false)}
								className="mt-4"
							>
								Or skip
							</Button>
						</DialogFooter>
					</Tabs>
				</DialogContent>
			</Dialog>
		</div>
	);
};
export default DialogForm;
