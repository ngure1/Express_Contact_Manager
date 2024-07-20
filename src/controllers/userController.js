import expressAsyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import { z } from "zod";
import bcrypt from "bcrypt";

export const userRegisterSchema = z.object({
	firstName: z.string({
		required_error: "First Name is required",
	}),
	lastName: z.string({
		required_error: "Last Name is required",
	}),
	username: z.string().optional(),
	email: z
		.string({
			required_error: "Email is required",
		})
		.email("Enter a valid email"),
	password: z
		.string({
			required_error: "Password is required",
		})
		.min(8, {
			message: "Password must be a minimum of 8 characters",
		}),
});

const usersRegister = expressAsyncHandler(async (req, res) => {
	const result = userRegisterSchema.safeParse(req.body);
	if (!result.success) {
		const errorMessages = result.error.errors.map((e) => e.message).join(", ");
		res.status(400);
		throw new Error(errorMessages);
	}

	const { email, password } = result.data;
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		res.status(400);
		throw new Error("User with this email already exists");
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const user = await User.create({
		...result.data,
		password: hashedPassword,
	});
	if (!user) {
		throw new Error("User not created");
	}

	res.status(201).json({
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		username: user.username,
		email: user.email,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	});
});

const usersMe = expressAsyncHandler(async (req, res) => {
	const user = req.user;
	if (!user) {
		res.status(401);
		throw new Error("Authentication credentials were not provided");
	}
	res.status(200).json({
		id: user.id,
		email: user.email,
	});
});

export { usersRegister, usersMe };
