import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

const contactSchema = z.object({
	firstName: z
		.string({ required_error: "First Name is required" })
		.min(3, { message: "First Name must be a minimum of 3 characters" }),
	lastName: z
		.string({ required_error: "Last Name is required" })
		.min(1, { message: "Last Name is required" }),
	email: z
		.string({ required_error: "Email is required" })
		.min(1, { message: "Email is required" })
		.email("Invalid email address"),
	phoneNumber: z
		.string({ required_error: "Phone Number is required" })
		.min(1, { message: "Phone Number is required" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
	});

	const onSubmit = (data: ContactFormData) => {
		console.log(data);
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="space-y-4"
		>
			<FormControl
				isInvalid={!!errors.firstName}
				colorScheme="pink"
			>
				<FormLabel>First Name</FormLabel>
				<Input
					type="text"
					colorScheme="pink"
					{...register("firstName")}
				/>
				<FormErrorMessage>
					{errors.firstName && errors.firstName.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={!!errors.lastName}>
				<FormLabel>Last Name</FormLabel>
				<Input
					type="text"
					{...register("lastName")}
				/>
				<FormErrorMessage>
					{errors.lastName && errors.lastName.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={!!errors.email}>
				<FormLabel>Email</FormLabel>
				<Input
					type="email"
					{...register("email")}
				/>
				<FormErrorMessage>
					{errors.email && errors.email.message}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={!!errors.phoneNumber}>
				<FormLabel>Phone Number</FormLabel>
				<Input
					type="text"
					{...register("phoneNumber")}
				/>
				<FormErrorMessage>
					{errors.phoneNumber && errors.phoneNumber.message}
				</FormErrorMessage>
			</FormControl>

			<Button
				colorScheme="pink"
				mr={3}
				type="submit"
			>
				Save
			</Button>
		</form>
	);
};

export default ContactForm;
