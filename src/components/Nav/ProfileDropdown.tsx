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
import { useUser } from "@/app/providers/UserProvider";
import { croppedAvatarUrl } from "@/lib/utils";
import Link from "next/link";

export function ProfileDropdown() {
	const { user } = useUser();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="p-0">
					{user.avatar.public_id ? (
						<Link href={`/user/${user.email}`}>
							<Image
								src={croppedAvatarUrl(user.avatar.public_id)}
								alt=""
								width="40"
								height="40"
								className="rounded-full min-w-8 min-h-8"
							/>
						</Link>
					) : (
						<MdAccountCircle size={25} />
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						Profile
						{/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
					</DropdownMenuItem>
					<DropdownMenuItem>
						Switch Account
						{/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
					</DropdownMenuItem>
					<DropdownMenuItem>
						Settings
						{/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
					</DropdownMenuItem>
					<DropdownMenuItem>
						Keyboard shortcuts
						{/* <DropdownMenuShortcut>⌘K</DropdownMenuShortcut> */}
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
				<DropdownMenuItem>GitHub</DropdownMenuItem>
				<DropdownMenuItem>Support</DropdownMenuItem>
				<DropdownMenuItem disabled>API</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Log out
					{/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
