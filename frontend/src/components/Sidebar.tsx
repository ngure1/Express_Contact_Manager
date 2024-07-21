import { BiSolidHome } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import Dialog from "./forms/Dialog";
import ContactForm from "./forms/ContactForm";
import { useState } from "react";

interface LinksProps {
	icon: React.ReactNode;
	text: string;
	to: string;
}

const Links = ({ icon, text, to }: LinksProps) => {
	return (
		<Link
			to={to}
			className="flex flex-col sm:flex-row items-center gap-2 rounded-md py-4 px-5 w-full hover:bg-pink-100 transition"
		>
			{icon}
			<span>{text}</span>
		</Link>
	);
};

const Sidebar = () => {
	const [isContactDialogOpen, setContactDialogOpen] = useState(false);

	function closeContactDialog() {
		setContactDialogOpen(false);
	}

	function openContactDialog() {
		setContactDialogOpen(true);
	}

	const links: LinksProps[] = [
		{
			text: "Home",
			to: "/",
			icon: (
				<BiSolidHome
					size={25}
					className="sm:h-7 sm:w-7"
				/>
			),
		},
		{
			text: "Search",
			to: "/favourites",
			icon: (
				<IoSearch
					size={25}
					className="sm:h-7 sm:w-7"
				/>
			),
		},
		{
			text: "Favourites",
			to: "/favourites",
			icon: (
				<FaRegStar
					size={25}
					className="sm:h-7 sm:w-7"
				/>
			),
		},
	];

	return (
		<div className="fixed left-0 top-0 min-h-screen bg-pink-200 px-2 pt-5 rounded-md w-[13%] min-w-[6rem]">
			<div className="w-full flex items-center justify-center flex-col rounded-lg gap-2">
				{links.map((link, index) => (
					<Links
						key={index}
						icon={link.icon}
						text={link.text}
						to={link.to}
					/>
				))}
				<Button
					leftIcon={
						<IoAdd
							size={25}
							className="sm:h-7 sm:w-7"
						/>
					}
					variant="outline"
					colorScheme="pink"
					className="flex flex-col sm:flex-row"
					onClick={openContactDialog}
				>
					Add Contact
				</Button>
			</div>
			{isContactDialogOpen && (
				<Dialog
					isOpen={isContactDialogOpen}
					onClose={closeContactDialog}
					title="Create Contact"
					children={<ContactForm />}
				></Dialog>
			)}
		</div>
	);
};

export default Sidebar;
