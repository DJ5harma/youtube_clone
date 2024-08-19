import ErrorComponent from "@/components/ErrorComponent";
import SubscribeSection from "@/components/SubscribeSection";
import dbConnect from "@/lib/dbConnect";
import getUserIdFromJwt from "@/lib/getUserIdFromJwt";
import { CCreator } from "@/lib/types";
import USER from "@/models/USER.model";

export default async function page() {
	await dbConnect();
	const user_id = await getUserIdFromJwt();
	if (!user_id)
		return (
			<ErrorComponent
				message="You'll need an account to subscribe to channels"
				showForm
			/>
		);
	const { subscriptions }: { subscriptions: CCreator[] } = await USER.findById(
		user_id
	)
		.select("-_id subscriptions")
		.populate({
			path: "subscriptions",
			select: "username email avatar subscribers",
		});

	if (!subscriptions || subscriptions.length === 0)
		return (
			<ErrorComponent message="Seems like you haven't subscribed to any channels yet..." />
		);

	return (
		<div className="flex w-full flex-wrap">
			{subscriptions.map((creator) => (
				<div
					className="p-4 bg-neutral-500 backdrop-blur-xl bg-opacity-50 rounded-2xl"
					key={creator._id}
				>
					<SubscribeSection
						creator={JSON.parse(JSON.stringify(creator))}
						subscribed
					/>
				</div>
			))}
		</div>
	);
}
