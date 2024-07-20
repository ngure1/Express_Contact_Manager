import { Router } from "express";
import {
	getAllContacts,
	getMyContacts,
	getUserContacts,
	createContact,
	getContact,
	updateContact,
	deleteContact,
} from "../controllers/contactController.js";
import verifyToken from "../middleware/jwtCookieVerify.js";

const contactRoutes = Router();

contactRoutes.use(verifyToken);
contactRoutes.route("/").get(getMyContacts).post(createContact);
contactRoutes.route("/all").get(getAllContacts);
contactRoutes.route("/:userId").get(getUserContacts)
contactRoutes
	.route("/:id")
	.get(getContact)
	.put(updateContact)
	.delete(deleteContact);

export default contactRoutes;
