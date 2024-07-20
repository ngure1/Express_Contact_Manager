import { Router } from "express";
import {
	getContacts,
	createContact,
	getContact,
	updateContact,
	deleteContact,
} from "../controllers/contactController.js";

const contactRoutes = Router();

contactRoutes.route("/").get(getContacts).post(createContact);
contactRoutes
	.route("/:id")
	.get(getContact)
	.put(updateContact)
	.delete(deleteContact);

export default contactRoutes;
