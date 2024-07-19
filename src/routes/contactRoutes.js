import { Router } from "express";
import { getContacts,createContact,getContact,updateContact,deleteContact } from "../controllers/contactController.js";


const router = Router();

router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);


export { router };
