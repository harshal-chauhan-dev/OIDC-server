import ApiError from "../api-error.ts";
import type { Request, Response, NextFunction } from "express";
import config from "../../config/index.ts";

export default function errorHandler(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
) {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    config.nodeEnv === "development" ? console.error(err) : null;
    
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
}
