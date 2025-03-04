import {
	Avatar,
	Card,
	CardBody,
	CardFooter,
	IconButton,
	Skeleton,
} from "@chakra-ui/react";
import { IoCallOutline } from "react-icons/io5";
import { TbMessage } from "react-icons/tb";
import type { Contact } from "../../types";

const ContactCard = ({
	firstName,
	lastName,
	phoneNumber,
}: Partial<Contact>) => {
	return (
		<Card
			display="flex"
			flexDirection="row"
			size="sm"
			className="sm:max-w-[25rem]"
		>
			<CardBody className="flex gap-4 items-center">
				<Avatar name={firstName} />
				<div className="text-left">
					<p className="text-lg">
						{firstName} {lastName}
					</p>
					<p className="text-sm text-neutral-600">{phoneNumber}</p>
				</div>
			</CardBody>
			<CardFooter className="flex gap-4">
				<IconButton
					aria-label="Call Sage"
					colorScheme="green"
					variant="outline"
					icon={<IoCallOutline size={25} />}
				></IconButton>
				<IconButton
					aria-label="Call Sage"
					colorScheme="blue"
					icon={<TbMessage size={25} />}
				></IconButton>
			</CardFooter>
		</Card>
	);
};

export const ContactCardSkeleton = () => {
	return (
	<Skeleton>
		<ContactCard/>
	</Skeleton>
	);
};

export default ContactCard;
