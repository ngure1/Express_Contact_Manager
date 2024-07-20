import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import {
	generateAccessToken,
	generateRefreshToken,
} from "../utils/authTokens.js";
import { userRegisterSchema } from "./userController.js";

const jwtCreate = expressAsyncHandler(async (req, res) => {
	const result = userRegisterSchema
		.pick({
			email: true,
			password: true,
		})
		.safeParse(req.body);

	if (!result.success) {
		const errorMessages = result.error.errors.map((e) => e.message).join(", ");
		res.status(400);
		throw new Error(errorMessages);
	}

	const { email, password } = result.data;

	const user = await User.findOne({ email });
	if (!user) {
		res.status(400);
		throw new Error("No user found registered under that email");
	}

	const isPasswordsMatch = await bcrypt.compare(password, user.password);
	if (!isPasswordsMatch) {
		res.status(400);
		throw new Error("You entered the wrong password");
	}

	const accessToken = generateAccessToken(user);
	const refreshToken = generateRefreshToken(user);

	res.cookie("access", accessToken, {
		httpOnly: true,
		maxAge: 5 * 60 * 1000,
		secure: true,
	});
	res.cookie("refresh", refreshToken, {
		httpOnly: true,
		maxAge: 15 * 24 * 60 * 60 * 1000,
		secure: true,
	});

	res.status(201).json({
		refresh: refreshToken,
		access: accessToken,
	});
});

const jwtRefresh = expressAsyncHandler(async (req, res) => {
	const { refresh } = req.cookies;
	if (!refresh) {
		res.status(400);
		throw new Error("Refresh token not found...");
	}
	const { email } = jwt.decode(refresh, process.env.ACCESS_TOKEN_SECRET);
	const user = await User.findOne({ email });
	if (!user || !email) {
		res.status(400);
		throw new Error(
			"No users found...this should not happen unless the email is not encoded in the refresh token"
		);
	}

	const accessToken = generateAccessToken(user);
	//clear existing cookie
	res.clearCookie("access");

	res.cookie("access", accessToken, {
		httpOnly: true,
		maxAge: 5 * 60 * 1000,
		secure: true,
	});

	res.status(201).json({
		access: accessToken,
	});
});

export { jwtRefresh, jwtCreate };
