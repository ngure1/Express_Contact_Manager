import express from "express";
import "dotenv/config";
import { connectDb } from "./db/index.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from "cors"

// Import routes
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const port = process.env.PORT;

// Connect to the database
connectDb().then(() => {
	// Common middleware
	app.use(express.json());
	app.use(cookieParser());
	app.use(cors({
		origin:"http://localhost:3000/"
	}))

	// Routes
	app.use("/api/contacts", contactRoutes);
	app.use("/users", userRoutes);
	app.use("/auth",authRoutes)

	// Error handling middleware
	app.use(errorHandler);

	// Start the server
	app.listen(port, () => {
		console.log(`Server running on port ${port} ...`);
	});
});
