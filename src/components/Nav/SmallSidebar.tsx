"use client";
import React from "react";
import { BiHome, BiSolidLike } from "react-icons/bi";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import CustomTooltip from "./CustomTooltip";
import Link from "next/link";

export const SmallSidebar = () => {
	return (
		<aside className="h-full inset-y-0 left-0 z-10 flex-col border-r bg-background w-14 top-14 justify-between hidden sm:flex">
			<nav className="flex flex-col items-center gap-4 px-2 py-4">
				<Link href="/">
					<CustomTooltip icon={<BiHome />} text="Home" />
				</Link>
				<Link href="/subscriptions">
					<CustomTooltip
						icon={<MdOutlineSubscriptions />}
						text="Subscriptions"
					/>
				</Link>
				<Link href="/watchHistory">
					<CustomTooltip icon={<FaRegClock />} text="Watch History" />
				</Link>
				<Link href="/likedVideos">
					<CustomTooltip icon={<BiSolidLike />} text="Liked Videos" />
				</Link>
			</nav>
			<nav className="flex flex-col items-center gap-4 px-2 py-4">
				<Link href="/settings">
					<CustomTooltip icon={<IoMdSettings />} text="Settings" />
				</Link>
			</nav>
		</aside>
	);
};
