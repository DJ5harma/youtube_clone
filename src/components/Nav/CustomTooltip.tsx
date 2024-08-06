"use client";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

const CustomTooltip = ({
	icon,
	text,
	size,
}: {
	icon: ReactNode;
	text: string;
	size?: number;
}) => (
	<Tooltip>
		<TooltipTrigger asChild>
			<div className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 cursor-pointer">
				<div
					style={size ? { height: size, width: size } : {}}
					className="h-5 w-5 [&>*]:w-full [&>*]:h-full"
				>
					{icon}
				</div>
				<span className="sr-only">{text}</span>
			</div>
		</TooltipTrigger>
		<TooltipContent side="bottom">{text}</TooltipContent>
	</Tooltip>
);

export default CustomTooltip;
