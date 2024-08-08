import React, { Dispatch, SetStateAction } from "react";
import { BiPause, BiPlay } from "react-icons/bi";

const MobileControlButtons = ({
	paused,
	togglePlay,
	handleSeek,
	videoRef,
	hideControlsTimer,
	setHideControlsTimer,
}: {
	paused: boolean;
	togglePlay: () => void;
	handleSeek: (val: number) => void;
	videoRef: React.RefObject<HTMLVideoElement>;
	hideControlsTimer: number;
	setHideControlsTimer: Dispatch<SetStateAction<number>>;
}) => {
	return (
		<div
			className="w-full h-full absolute top-0 flex justify-between"
			onClick={() => setHideControlsTimer((prev) => (prev === 0 ? 4 : 0))}
		>
			<div
				className="h-full flex-1 flex justify-center items-center"
				onDoubleClick={(e) => {
					e.stopPropagation();
					setHideControlsTimer(2);
					if (videoRef.current && videoRef.current.currentTime - 5 >= 0)
						handleSeek(videoRef.current.currentTime - 5);
				}}
			></div>
			<div
				className={`h-full flex justify-center items-center mt-8 ${
					hideControlsTimer === 0 ? "opacity-0" : ""
				}`}
			>
				{paused ? (
					<BiPlay
						size={40}
						onClick={(e) => {
							e.stopPropagation();
							hideControlsTimer === 0 ? setHideControlsTimer(8) : togglePlay();
						}}
					/>
				) : (
					<BiPause
						size={40}
						onClick={(e) => {
							e.stopPropagation();
							hideControlsTimer === 0 ? setHideControlsTimer(8) : togglePlay();
						}}
					/>
				)}
			</div>
			<div
				className="h-full flex-1 flex justify-center items-center"
				onDoubleClick={(e) => {
					e.stopPropagation();
					setHideControlsTimer(2);
					if (
						videoRef.current &&
						videoRef.current.currentTime + 5 <= videoRef.current.duration
					)
						handleSeek(videoRef.current.currentTime + 5);
				}}
			></div>
		</div>
	);
};

export default MobileControlButtons;
