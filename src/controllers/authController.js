import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { generateAccessToken } from "../utils/authTokens.js";

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

export { jwtRefresh };
