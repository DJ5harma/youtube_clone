"use client";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { BiHome, BiMenu } from "react-icons/bi";
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
				className="w-1/6 gap-0 flex flex-col px-0 items-start"
			>
				<SheetTitle className="w-full text-center my-2">Menu</SheetTitle>
				<Button variant="ghost" className="gap-3 w-full justify-start py-6">
					<BiHome size={25} />
					<p>Home</p>
				</Button>
				<Button variant="ghost" className="gap-3 w-full justify-start py-6">
					<FaRegClock size={25} />
					<p>History</p>
				</Button>
				<Button variant="ghost" className="gap-3 w-full justify-start py-6">
					<MdOutlineSubscriptions size={25} />
					<p>Subscriptions</p>
				</Button>
				<Button variant="ghost" className="gap-3 w-full justify-start py-6">
					<IoMdSettings size={25} />
					<p>Settings</p>
				</Button>
			</SheetContent>
		</Sheet>
	);
}
