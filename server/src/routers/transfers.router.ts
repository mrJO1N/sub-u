import { Router } from "express";
import transfersValidator from "../middlewares/validators/transfers.validator";
import authValidator from "../middlewares/validators/auth.validator";
import transfersController from "../controllers/transfers.controller";

const router = Router();

router.post(
  "/make-to",
  authValidator.checkToken,
  transfersValidator.makeTo,
  transfersController.makeTo
);
router.post(
  "/make-to-me",
  authValidator.checkToken,
  transfersValidator.requestQR,
  transfersController.requestQR
);
router.post(
  "/run/:QRtoken",
  authValidator.checkToken,
  transfersValidator.runQR,
  transfersController.runQR
);

export default router;
