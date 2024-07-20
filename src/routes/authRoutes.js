import { Router } from "express";


const authRoutes = Router()

authRoutes.route("/jwt/refresh").post()

export default authRoutes