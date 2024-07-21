import {
	Avatar,
	AvatarBadge,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	IconButton,
	InputGroup,
	Input,
	InputRightElement,
} from "@chakra-ui/react";
import { IoSend } from "react-icons/io5";

const MessageCard = () => {
	return (
		<Card>
			<CardHeader className="flex gap-6">
				<Avatar>
					<AvatarBadge
						boxSize="1.2rem"
						bg="green.500"
					/>
				</Avatar>
				<div className="text-left">
					<p className="text-lg">Jane Doe</p>
					<p className="text-sm text-neutral-600">012378826</p>
				</div>
			</CardHeader>
			<CardBody>List of messages</CardBody>
			<CardFooter>
				<InputGroup>
					<Input
						pr="4.5rem"
                        focusBorderColor="blue.500"
						borderRadius="full"
						placeholder="Type your message here..."
					/>
					<InputRightElement width="3rem">
						<IconButton
							isRound
                            size="sm"
							aria-label="Call Sage"
							colorScheme="blue"
							icon={<IoSend size={20} />}
						></IconButton>
					</InputRightElement>
				</InputGroup>
			</CardFooter>
		</Card>
	);
};

export default MessageCard;
