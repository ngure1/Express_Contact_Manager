import ContactCard from "../components/Cards/ContactCard";
import axiosInstance from "../axios";
import { useState, useEffect } from "react";
import type { Contact } from "../types";
import { useToast } from "@chakra-ui/react";
import MessageCard from "../components/Cards/MessageCard";

const Home = () => {
	const [contacts, setContacts] = useState<Contact[]>([]);

	const toast = useToast();
	useEffect(() => {
		axiosInstance
			.get("/api/contacts/")
			.then((res) => {
				setContacts(res.data);
			})
			.catch((err) => {
				toast({
					title: "Failed",
					description: "Something went wrong while fetching your contacts",
					status: "error",
				});
				console.log(err);
			});
	}, []);
	return (
		<div className="flex w-full justify-between py-5 pr-20">
			<div className="flex flex-col gap-4">
				{contacts &&
					contacts.map((contact, index) => (
						<ContactCard
							key={index}
							firstName={contact.firstName}
							lastName={contact.lastName}
							phoneNumber={contact.phoneNumber}
						/>
					))}
			</div>
			<div className="w-[50%]">
				<MessageCard />
			</div>
		</div>
	);
};

export default Home;
