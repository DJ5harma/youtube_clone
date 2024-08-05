"use client";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProfileDropdown } from "@/components/Nav/ProfileDropdown";
import { ImYoutube, ImYoutube2 } from "react-icons/im";
import { LuUpload } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { SheetSidebar } from "@/components/Nav/SheetSidebar";
import CustomTooltip from "@/components/Nav/CustomTooltip";
import React from "react";
import { ModeToggle } from "@/app/providers/ThemeProvider";
import { BiSearch } from "react-icons/bi";

const Topbar = () => {
	return (
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
				<CustomTooltip icon={<ModeToggle />} text="Toggle theme" />
				<CustomTooltip icon={<LuUpload />} text="Upload +" />
				<CustomTooltip icon={<ProfileDropdown />} text="Profile Menu" />
			</div>
		</aside>
	);
};

export default Topbar;
