import { z } from "zod";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Input,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Button,
	Card,
	CardHeader,
	CardBody,
	useToast,
} from "@chakra-ui/react";
import axiosInstance from "../../axios";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";

// Define the schema for validation
const LoginSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.min(1, { message: "Email is required" })
		.email("Invalid email address"),
	password: z
		.string({ required_error: "Password is required" })
		.min(8, { message: "Password must be a minimum of 8 characters" }),
});

type LoginFormData = z.infer<typeof LoginSchema>;

const LoginForm = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(LoginSchema),
	});

	const toast = useToast();
	const navigate = useNavigate();
	const toastIdRef = React.useRef<number| string | null>(null);

	const onSubmit = async (data: LoginFormData) => {
		const loginPromise = axiosInstance.post("/auth/jwt/create", data);

		if (toastIdRef.current === null) {
			// Create the initial loading toast and store its ID
			toastIdRef.current = toast({
				title: "Logging you in",
				description: "Please wait",
				status: "loading",
				duration: null,
				isClosable: false,
			});
		} else {
			// Update the existing toast to loading state
			toast.update(toastIdRef.current, {
				title: "Logging you in",
				description: "Please wait",
				status: "loading",
				duration: null,
				isClosable: false,
			});
		}

		try {
			await loginPromise;

			// Update toast to success
			toast.update(toastIdRef.current!, {
				title: "Login Successful",
				description: "Redirecting to the home page",
				status: "success",
				duration: 5000,
				isClosable: true,
			});
			navigate("/");
		} catch (err) {
			if (isAxiosError(err)) {
				// Update toast to error
				toast.update(toastIdRef.current!, {
					title: "Login failed",
					description: err.response?.data?.message || "Something went wrong",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			} else {
				// Update toast to unexpected error
				toast.update(toastIdRef.current!, {
					title: "Login failed",
					description: "An unexpected error occurred",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			}
		}
	};

	return (
		<Card size="lg">
			<CardHeader className="flex flex-col text-center">
				<p className="font-semibold text-xl">Login</p>
				<p className="text-xs text-gray-500">Login to your account</p>
			</CardHeader>
			<CardBody>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-5"
				>
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

					<FormControl isInvalid={!!errors.password}>
						<FormLabel>Password</FormLabel>
						<Input
							type="password"
							{...register("password")}
						/>
						<FormErrorMessage>
							{errors.password && errors.password.message}
						</FormErrorMessage>
					</FormControl>

					<Button
						colorScheme="pink"
						type="submit"
						className="w-full"
					>
						Login
					</Button>
				</form>
			</CardBody>
		</Card>
	);
};

export default LoginForm;
