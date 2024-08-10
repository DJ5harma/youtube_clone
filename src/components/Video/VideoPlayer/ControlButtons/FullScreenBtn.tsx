"use client";
import CustomTooltip from "@/components/Nav/CustomTooltip";
import React, { useEffect, useState } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

const FullScreenBtn = ({
	toggleFullscreen,
}: {
	toggleFullscreen: () => boolean;
}) => {
	const [inFullscreen, setInFullscreen] = useState(false);
	useEffect(() => {
		const handleFullscreenChange = () =>
			setInFullscreen(!!document.fullscreenElement);
		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () =>
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
	}, []);
	return (
		<div
			className="flex justify-center items-center [&>*]:w-[25px] sm:[&>*]:w-[40px]"
			onClick={() => toggleFullscreen()}
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
