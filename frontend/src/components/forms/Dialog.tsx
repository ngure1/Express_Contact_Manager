import {
	Modal,
	ModalOverlay,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	ModalContent,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

interface DialogProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
	title?: string;
}

const Dialog = ({ isOpen, onClose, children, size, title }: DialogProps) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			motionPreset="slideInRight"
			scrollBehavior="inside"
			size={size}
			blockScrollOnMount={false}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>{children}</ModalBody>
				{/* <ModalFooter>
					<Button
						colorScheme="pink"
						mr={3}
					>
						Save
					</Button>

					<Button
						colorScheme="pink"
						variant="outline"
						mr={3}
						onClick={onClose}
					>
						Close
					</Button>
				</ModalFooter> */}
			</ModalContent>
		</Modal>
	);
};

export default Dialog;
