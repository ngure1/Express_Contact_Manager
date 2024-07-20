import { Contact } from "../models/contact.js";
import expressAsyncHandler from "express-async-handler";
import { z } from "zod";

const contactSchema = z.object({
	firstName: z
		.string({ required_error: "First Name is required" })
		.min(3, { message: "First Name must be a minimum of 3 characters" }),
	lastName: z.string({ required_error: "Last Name is required" }),
	email: z
		.string({ required_error: "Email is required" })
		.email("Invalid email address"),
	phoneNumber: z.string({ required_error: "Phone Number is required" }),
});

const getAllContacts = expressAsyncHandler(async (req, res) => {
	const contacts = await Contact.find().populate(
		"owner",
		"firstName lastName email"
	);
	res.status(200).json(contacts);
});

const getMyContacts = expressAsyncHandler(async (req, res) => {
	const userId = req.user.id;
	const contacts = await Contact.find({ owner: userId });
	res.status(200).json(contacts);
});

const createContact = expressAsyncHandler(async (req, res) => {
	const result = contactSchema.safeParse(req.body);
	if (!result.success) {
		const errorMessage = result.error.errors.map((e) => e.message).join(", ");
		res.status(400);
		throw new Error(errorMessage);
	}

	const userId = req.user.id;
	const contact = await Contact.create({
		owner: userId,
		...result.data,
	});
	res.status(201).json(contact);
});

const getContact = expressAsyncHandler(async (req, res) => {
	const id = req.params.id;
	const contact = await Contact.findById(id);
	if (!contact) {
		res.status(404);
		throw new Error("Contact not found");
	}
	res.status(200).json(contact);
});

const updateContact = expressAsyncHandler(async (req, res) => {
	const id = req.params.id;
	const result = contactSchema.partial().safeParse(req.body);
	if (!result.success) {
		const errorMessages = result.error.errors.map((e) => e.message).join(", ");
		res.status(400);
		throw new Error(errorMessages);
	}

	const contact = await Contact.findById(id);
	if (!contact) {
		res.status(404);
		throw new Error("Contact not found");
	}
	const userId = req.user.id;
	if (contact.owner.toString() !== userId) {
		res.status(403);
		throw new Error("Cannot change a contact not registered under you");
	}
	const { firstName, lastName, email, phoneNumber } = result.data;
	contact.firstName = firstName || contact.firstName;
	contact.lastName = lastName || contact.lastName;
	contact.email = email || contact.email;
	contact.phoneNumber = phoneNumber || contact.phoneNumber;

	const updatedContact = await contact.save();

	res.status(200).json(updatedContact);
});

const deleteContact = expressAsyncHandler(async (req, res) => {
	const id = req.params.id;
	const contact = await Contact.findByIdAndDelete(id);
	if (!contact) {
		res.status(404);
		throw new Error("Contact not found");
	}
	const userId = req.user.id;
	if (contact.owner.toString() !== userId) {
		res.status(403);
		throw new Error("Cannot change a contact not registered under you");
	}
	res.status(204).json({
		message: `Contact ${id} deleted successfully`,
	});
});

export {
	getAllContacts,
	getMyContacts,
	createContact,
	getContact,
	updateContact,
	deleteContact,
};
