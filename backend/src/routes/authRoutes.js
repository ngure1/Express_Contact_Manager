import { Router } from "express";
import { jwtCreate, jwtRefresh } from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.route("/jwt/create").post(jwtCreate);
authRoutes.route("/jwt/refresh").post(jwtRefresh);

export default authRoutes;
