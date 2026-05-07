import BaseDto from "../../../common/dto/base.dto.ts";
import { z } from "zod";

export default class RegisterClientDto extends BaseDto {

    static schema = z.object({
        appName: z.string().min(3),
        appType: z.enum(["web", "app"]),
        redirectUris: z.array(z.string().startsWith("http")),
    });
}