import ApiError from "../api-error.ts";
import type { Request, Response, NextFunction } from "express";

type DtoValidator = {
    validate: (data: unknown) => { errors: string[] | null, value: unknown | null };
}

export default function validateSchema(DtoClass: DtoValidator) {
    return (req: Request, res: Response, next: NextFunction) => {

        const { errors, value } = DtoClass.validate(req.body);
        
        if (errors) {
            return next(ApiError.badRequest(errors.join(", ")));
        }
        
        req.body = value;
        next();
    }
}