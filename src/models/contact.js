import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export const Contact = mongoose.model("Contact", contactSchema);
