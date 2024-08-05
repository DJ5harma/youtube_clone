"use client";
import React from "react";
import { BiHome } from "react-icons/bi";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import CustomTooltip from "./CustomTooltip";

export const SmallSidebar = () => {
	return (
		<aside
			className="fixed inset-y-0 left-0 z-10 flex flex-col border-r bg-background w-14 top-14 justify-between"
			style={{ height: "calc(100vh - 56px)" }}
		>
			<nav className="flex flex-col items-center gap-4 px-2 py-4">
				<CustomTooltip icon={<BiHome />} text="Home" />
				<CustomTooltip icon={<MdOutlineSubscriptions />} text="Subscriptions" />
				<CustomTooltip icon={<FaRegClock />} text="Watch History" />
			</nav>
			<nav className="flex flex-col items-center gap-4 px-2 py-4">
				<CustomTooltip icon={<IoMdSettings />} text="Settings" />
			</nav>
		</aside>
	);
};
