"use client";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { BiHome, BiMenu, BiSolidLike } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineSubscriptions } from "react-icons/md";

export function SheetSidebar() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<BiMenu />
			</SheetTrigger>
			<SheetContent
				side={"left"}
				className="w-1/6 min-w-48 gap-0 flex flex-col px-0 items-start"
			>
				<SheetTitle className="w-full text-center my-2">Menu</SheetTitle>
				<Link className="w-full" href="/">
					<Button variant="ghost" className="gap-3 w-full justify-start py-6">
						<BiHome size={25} />
						<p>Home</p>
					</Button>
				</Link>
				<Link className="w-full" href="/watchHistory">
					<Button variant="ghost" className="gap-3 w-full justify-start py-6">
						<FaRegClock size={25} />
						<p>History</p>
					</Button>
				</Link>
				<Link className="w-full" href="/subscriptions">
					<Button variant="ghost" className="gap-3 w-full justify-start py-6">
						<MdOutlineSubscriptions size={25} />
						<p>Subscriptions</p>
					</Button>
				</Link>
				<Link className="w-full" href="/likedVideos">
					<Button variant="ghost" className="gap-3 w-full justify-start py-6">
						<BiSolidLike size={25} />
						<p>Liked videos</p>
					</Button>
				</Link>
				<Link className="w-full" href="/settings">
					<Button variant="ghost" className="gap-3 w-full justify-start py-6">
						<IoMdSettings size={25} />
						<p>Settings</p>
					</Button>
				</Link>
			</SheetContent>
		</Sheet>
	);
}
