import { Router } from "express";
import {
	usersRegister,
	usersLogin,
	usersMe,
} from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.route("/register").post(usersRegister);
userRoutes.route("/login").post(usersLogin);
userRoutes.route("/me").get(usersMe);

export default userRoutes;
