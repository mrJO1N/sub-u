import { Router } from "express";
import authValidator from "../middlewares/validators/auth.validator";
import depositController from "../controllers/deposit.controller";

const router = Router();

router.get("/10", authValidator.checkToken, depositController.deposit);

export default router;
