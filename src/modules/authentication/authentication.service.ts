import ApiError from "../../common/utils/api-error.ts";
import { generateRandomString } from "../../common/utils/helper.ts";
import { clients } from "../../db/schema.ts";
import RegisterClientDto from "./dto/registerClient.dto.ts";
import { z } from "zod";
import { db } from "../../db/index.ts";
import { CLIENT_APP_TYPES } from "../../common/constant.ts";

export default class AuthenticationService {

    static async registerClient({
        appName,
        appType,
        redirectUris,
    }: z.infer<typeof RegisterClientDto.schema>) {

        if(!appName || appName.length < 3) {
            throw ApiError.badRequest("App name is required and must be at least 3 characters long");
        }

        if(!appType || !CLIENT_APP_TYPES.includes(appType)) {
            throw ApiError.badRequest("App type is required and must be either " + CLIENT_APP_TYPES.join(", "));
        }

        if(!redirectUris || redirectUris.length === 0) {
            throw ApiError.badRequest("Redirect URIs are required and must be an array");
        }

        if(!redirectUris.every((uri: string) => uri.startsWith("http"))) {
            throw ApiError.badRequest("Redirect URIs must be valid URLs");
        }

        const clientId = generateRandomString(16);
        const clientSecret = generateRandomString(32);

        const client = await db.insert(clients).values({
            appName,
            appType,
            redirectUris,
            clientId,
            clientSecret,
        }).returning({
            clientId: clients.clientId,
            clientSecret: clients.clientSecret,
        });

        console.log(client);

        return client;
    }
}