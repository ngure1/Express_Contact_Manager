import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: "5m",
		}
	);
};

const generateRefreshToken = (user) => {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: "30d",
		}
	);
};

export { generateAccessToken, generateRefreshToken };
