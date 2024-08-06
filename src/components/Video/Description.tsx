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
}: {
	description: string;
	createdAt: Date;
}) => {
	return (
		<Accordion type="single" collapsible>
			<AccordionItem value="item-1" className="px-4 border-4 rounded-xl my-2">
				<AccordionTrigger>
					<div className="flex justify-between w-full pr-2">
						<p>Description</p>
						<p>Published: {convertToHumanFriendlyDate(createdAt)}</p>
					</div>
				</AccordionTrigger>
				<AccordionContent>{description}</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default Description;
