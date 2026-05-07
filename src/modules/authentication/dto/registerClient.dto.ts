import BaseDto from "../../../common/dto/base.dto.ts";
import { z } from "zod";
import { CLIENT_APP_TYPES } from "../../../common/constant.ts";

export default class RegisterClientDto extends BaseDto {

    static schema = z.object({
        appName: z.string().min(3),
        appType: z.enum(CLIENT_APP_TYPES),
        redirectUris: z.array(z.string().startsWith("http")),
    });
}