import expressAsyncHandler from "express-async-handler";
import { User } from "../models/userModel.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRegisterSchema = z.object({
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

const usersLogin = expressAsyncHandler(async (req, res) => {
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

	console.log(user);
	const isPasswordsMatch = await bcrypt.compare(password, user.password);
	if (!isPasswordsMatch) {
		res.status(400);
		throw new Error("You entered the wrong password");
	}

	const access = jwt.sign(
		{
			email: user.email,
			id: user.id,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: "5m",
		}
	);
	res.cookie("access", access, {
		httpOnly: true,
		expiresIn: 30000,
		secure: true,
	});
	res.status(201).json({
		access: access,
	});
});

const usersMe = expressAsyncHandler(async (req, res) => {
	res.json({
		message: "Users me endpoint",
	});
});

export { usersRegister, usersLogin, usersMe };
