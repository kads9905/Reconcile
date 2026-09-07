// this middleware runs when the user requests a route that doesnt exist.

import { ApiError } from "../utils/ApiError.js";

const notFound = (req, res, next) => {
    next(new ApiError(404, `Route not found - ${req.originalUrl}`));
};

export { notFound };