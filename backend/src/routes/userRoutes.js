import { Router } from "express";
import { usersRegister, usersMe } from "../controllers/userController.js";
import verifyToken from "../middleware/jwtCookieVerify.js";

const userRoutes = Router();

userRoutes.route("/register").post(usersRegister);
userRoutes.route("/me").get(verifyToken, usersMe);

export default userRoutes;
