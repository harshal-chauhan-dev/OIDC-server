import ApiError from "../../common/utils/api-error.ts";
import ApiResponse from "../../common/utils/api-response.ts";
import AuthenticationService from "./authentication.service.ts";
import type { Request, Response } from "express";

export default class AuthenticationController {

    static async registerClient(req: Request, res: Response) {
    
        const { appName, appType, redirectUris } = req.body;
        const client = await AuthenticationService.registerClient({ appName, appType, redirectUris });
        return ApiResponse.created(res, "Client registered successfully", client);
    }
}