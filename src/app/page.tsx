"use client";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";
import { BiHome, BiMenu, BiSearch } from "react-icons/bi";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { ModeToggle } from "./providers/ThemeProvider";
import { ProfileDropdown } from "@/components/Nav/ProfileDropdown";
import { ImYoutube, ImYoutube2 } from "react-icons/im";
import { LuUpload } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { SheetSidebar } from "@/components/Nav/SheetSidebar";

const CustomTooltip = ({ icon, text }: { icon: ReactNode; text: string }) => (
	<Tooltip>
		<TooltipTrigger asChild>
			<div className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 cursor-pointer">
				<div className="h-5 w-5 [&>*]:w-full [&>*]:h-full">{icon}</div>
				<span className="sr-only">{text}</span>
			</div>
		</TooltipTrigger>
		<TooltipContent side="right">{text}</TooltipContent>
	</Tooltip>
);
export default function Nav() {
	return (
		<TooltipProvider>
			<aside className="fixed inset-y-0 right-0 top-0 z-10 border-2 bg-background flex justify-between w-screen h-14">
				<div className="flex items-center gap-4 px-2 py-4">
					<CustomTooltip icon={<SheetSidebar />} text="Menu" />
					<Tooltip>
						<TooltipTrigger asChild>
							<div className="flex items-center gap-1 opacity-95">
								<ImYoutube size={25} />
								<ImYoutube2 size={60} className="hidden sm:flex" />
							</div>
						</TooltipTrigger>
						<TooltipContent side="right">Youtube</TooltipContent>
					</Tooltip>
				</div>
				<div className="flex h-full items-center gap-1 px-2 py-4">
					<Input placeholder="Search" />
					<CustomTooltip icon={<BiSearch />} text="Search" />
				</div>
				<div className="flex h-full items-center gap-1 px-2 py-4">
					<ModeToggle />
					<CustomTooltip icon={<LuUpload />} text="Upload +" />
					<ProfileDropdown />
				</div>
			</aside>
			<aside
				className="fixed inset-y-0 left-0 z-10 flex flex-col border-r bg-background w-14 top-14 justify-between"
				style={{ height: "calc(100vh - 56px)" }}
			>
				<nav className="flex flex-col items-center gap-4 px-2 py-4">
					<CustomTooltip icon={<BiHome />} text="Home" />
					<CustomTooltip
						icon={<MdOutlineSubscriptions />}
						text="Subscriptions"
					/>
					<CustomTooltip icon={<FaRegClock />} text="Watch History" />
				</nav>
				<nav className="flex flex-col items-center gap-4 px-2 py-4">
					<CustomTooltip icon={<IoMdSettings />} text="Settings" />
				</nav>
			</aside>
		</TooltipProvider>
	);
}
