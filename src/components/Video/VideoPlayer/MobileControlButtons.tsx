import React from "react";
import { BiPause, BiPlay } from "react-icons/bi";
import { FaBackward, FaForward } from "react-icons/fa";

const MobileControlButtons = ({}: {}) => {
	return (
		<div className="bg-green-600 flex-1 flex items-center w-full h-full pt-8">
			<div className="bg-green-400 h-full flex-1 flex justify-center items-center">
				<div className="flex items-center gap-2">
					5s
					<FaBackward />
				</div>
			</div>
			<div className="bg-slate-950 flex justify-center items-center h-fit w-fit p-2 rounded-full"></div>
			<div className="bg-green-400 h-full flex-1 flex justify-center items-center">
				<div className="flex items-center gap-2">
					5s
					<FaForward />
				</div>
			</div>
		</div>
	);
};

export default MobileControlButtons;
