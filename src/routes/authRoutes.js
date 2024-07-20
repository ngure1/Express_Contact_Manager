import { Router } from "express";
import { jwtRefresh } from "../controllers/authController.js";

const authRoutes = Router()

authRoutes.route("/jwt/refresh").post(jwtRefresh);

export default authRoutes