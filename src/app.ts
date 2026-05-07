import express from "express";
import ApiError from "./common/utils/api-error.ts";
import errorHandler from "./common/utils/middleware/error-handler.middleware.ts";
import authenticationRoutes from "./modules/authentication/authentication.routes.ts";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/authentication", authenticationRoutes);

app.use((_req, _res, next) => {
    next(ApiError.notFound("Route not found"));
});

app.use(errorHandler);

export default app;