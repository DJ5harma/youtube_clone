"use client";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	// DropdownMenuPortal,
	DropdownMenuSeparator,
	// DropdownMenuShortcut,
	// DropdownMenuSub,
	// DropdownMenuSubContent,
	// DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { MdAccountCircle } from "react-icons/md";
import { sampleUser, useUser } from "@/app/providers/UserProvider";
import { croppedAvatarUrl } from "@/lib/utils";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function ProfileDropdown() {
	const { user, setUser } = useUser();
	const router = useRouter();
	const handleLogout = async () => {
		toast.loading("Logging you out");
		const { errMessage } = (await axios.get("/api/auth/logout")).data;
		toast.dismiss();
		if (errMessage) return toast.error(errMessage);
		toast.success("Logged out");
		setUser(sampleUser);
		router.push("/auth/login");
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Link href={`/user/${user.email}`}>
					<Image
						src={croppedAvatarUrl(user.avatar.public_id)}
						alt="profile icon"
						width="40"
						height="40"
						className="min-w-8 min-h-8"
					/>
				</Link>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>
					Hello {user._id ? user.username : "Guest"} !
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					{user._id && (
						<DropdownMenuItem>
							Profile
							{/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
						</DropdownMenuItem>
					)}
					<DropdownMenuItem>
						<Link href="/auth/login">
							{user._id ? "Switch Account" : "Sign in"}
						</Link>
						{/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
					</DropdownMenuItem>
				</DropdownMenuGroup>
				{/* <DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>Team</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem>Email</DropdownMenuItem>
								<DropdownMenuItem>Message</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>More...</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
					<DropdownMenuItem>
						New Team
						<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup> */}
				<DropdownMenuSeparator />
				<a href="https://github.com/DJ5harma/youtube_clone" target="_blank">
					<DropdownMenuItem>GitHub</DropdownMenuItem>
				</a>
				{/* <DropdownMenuItem>Support</DropdownMenuItem>
				<DropdownMenuItem disabled>API</DropdownMenuItem> */}
				{user._id && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => console.log("click")}>
							Log out
							{/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
