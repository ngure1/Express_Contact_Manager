import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";

export const connectDb = async () => {
	try {
		const connection = await mongoose.connect(`${process.env.DB_CONNECTION_STRING}/${DB_NAME}`);
		console.log("Mongo db connected succesfully");
	} catch (error) {
		console.log("Mongo db connection error", error);
		process.exit(1);
	}
};
