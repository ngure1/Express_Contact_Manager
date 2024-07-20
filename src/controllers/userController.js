import expressAsyncHandler from "express-async-handler";

const usersRegister = expressAsyncHandler(async (req, res) => {
	res.json({
		message: "User registration endpoint",
	});
});

const usersLogin = expressAsyncHandler(async (req, res) => {
	res.json({
		message: "Users login endpoint",
	});
});

const usersMe = expressAsyncHandler(async (req, res) => {
	res.json({
		message: "Users me endpoint",
	});
});

export { usersRegister, usersLogin, usersMe };
