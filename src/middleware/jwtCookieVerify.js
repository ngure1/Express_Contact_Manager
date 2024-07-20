import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

const verifyToken = expressAsyncHandler(async (req, res, next) => {
	const { access } = req.cookies;

	if (!access) {
		res.status(401);
		throw new Error("Authentication credentials were not provided");
	}

	jwt.verify(access, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) {
			res.status(401);
			throw new Error("Authentication credentials were not provided");
		}
		req.user = decoded;
		next();
	});
});

export default verifyToken;
