import { errors } from "../../constants.js";

const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode ? res.statusCode : 500;
	switch (statusCode) {
		case errors.badRequest:
			return res.json({
				message: err.message,
			});
			break;
		case errors.unauthorised:
			return res.json({
				message: err.message,
			});
			break;
		case errors.forbidden:
			return res.json({
				message: err.message,
			});
			break;
		case errors.notFound:
			return res.json({
				message: err.message,
			});
			break;
		case errors.serverError:
			return res.json({
				message: err.message,
			});
			break;
		default:
            console.log("No Error, All good !");
			break;
	}
};

export default errorHandler
