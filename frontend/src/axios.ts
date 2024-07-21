import axios from "axios";
import { url } from "./constants";

const axiosInstance = axios.create({
	baseURL: url,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

const reAuth = async () => {
	try {
		const response = await axiosInstance.post("/auth/jwt/refresh");
		console.log("Your token was expired but it has been renewed");
	} catch (err) {
		console.error("Failed to renew token:", err);
		throw err;
	}
};

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const initialRequest = error.config;
		if (error.response.status === 401 && !initialRequest._retry) {
			initialRequest._retry = true; 
			try {
				await reAuth();
				return axiosInstance(initialRequest);
			} catch (err) {
				return Promise.reject(err);
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
