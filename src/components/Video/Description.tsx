"use client";
import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { convertToHumanFriendlyDate } from "@/lib/utils";

const Description = ({
	description,
	createdAt,
	views,
}: {
	description: string;
	createdAt: string | Date;
	views: number;
}) => {
	return (
		<Accordion type="single" collapsible defaultValue="item-1">
			<AccordionItem
				value="item-1"
				className="px-4 border-2 sm:border-4 rounded-xl my-2"
			>
				<AccordionTrigger>
					<div className="flex flex-wrap items-center justify-between gap-4 w-full pr-2">
						<p className="text-xs">
							{views} views | {convertToHumanFriendlyDate(createdAt)}
						</p>
						<p className="text-center">Description</p>
					</div>
				</AccordionTrigger>
				<AccordionContent>
					<p>{description}</p>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default Description;
