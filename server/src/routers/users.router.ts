import { Router } from "express";
import usersValidator from "../middlewares/validators/users.validator";
import usersController from "../controllers/users.controller";

const router = Router();

router.post("/login", usersValidator.login, usersController.login);
router.post("/reg", usersValidator.reg, usersController.reg);
// router.get("/auth", usersValidator.checkAuth, usersController.checkAuth);

export default router;
