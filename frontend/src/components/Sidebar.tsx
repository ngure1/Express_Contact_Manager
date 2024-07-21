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
			className="flex flex-col sm:flex-row items-center gap-2 rounded-md py-4 w-full hover:border hover:border-blue-400 hover:pl-5 transition-all duration-500"
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
		<div className="fixed left-0 top-0 min-h-screen border border-blue-100 shadow-md px-8 pt-10 pb-12 w-[18%] min-w-[6rem] flex flex-col justify-between">
			<div className="w-full flex items-center justify-center flex-col rounded-lg gap-2">
				{links.map((link, index) => (
					<Links
						key={index}
						icon={link.icon}
						text={link.text}
						to={link.to}
					/>
				))}
			</div>
			<Button
				leftIcon={
					<IoAdd
						size={25}
						className="sm:h-7 sm:w-7"
					/>
				}
				variant="outline"
				size="md"
				colorScheme="blue"
				className="flex flex-col sm:flex-row"
				onClick={openContactDialog}
			>
				Add Contact
			</Button>
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
