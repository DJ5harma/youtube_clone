"use client";
import CustomTooltip from "@/components/Nav/CustomTooltip";
import React, { useState } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

const FullScreenBtn = ({
	toggleFullscreen,
}: {
	toggleFullscreen: () => boolean;
}) => {
	const [inFullscreen, setInFullscreen] = useState(false);
	return (
		<div
			className="flex justify-center items-center"
			onClick={() => setInFullscreen(toggleFullscreen())}
		>
			<CustomTooltip
				size={30}
				icon={inFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
				text={inFullscreen ? "Exit Fullscreen" : "Fullscreen"}
			/>
		</div>
	);
};

export default FullScreenBtn;
