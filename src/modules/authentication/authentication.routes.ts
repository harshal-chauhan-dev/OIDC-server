import { Router } from "express";
import AuthenticationController from "./authentication.controller.ts";
import RegisterClientDto from "./dto/registerClient.dto.ts";
import validateSchema from "../../common/utils/middleware/validate.middleware.ts";

const router = Router();

router.post("/register", validateSchema(RegisterClientDto), AuthenticationController.registerClient);

export default router;