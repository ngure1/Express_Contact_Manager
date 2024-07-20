import e from "express";
import "dotenv/config";
import { connectDb } from "./db/index.js";
import errorHandler from "./middlewear/errorHandler.js";
// import routes
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = e();
const port = process.env.PORT;

// connect to the database
connectDb().then(() => {
	//common middlewear
	app.use(e.json());

	app.listen(port, () => {
		console.log(`Server running on port ${port} ...`);
	});

	//routes
	app.use("/api/contacts", contactRoutes);
	app.use("/auth/users", userRoutes);

	//error handling middlewear
	app.use(errorHandler);
});
