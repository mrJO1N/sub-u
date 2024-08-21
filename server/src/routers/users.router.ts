import { Router } from "express";
import usersValidator from "../middlewares/validators/users.validator";
import authValidator from "../middlewares/validators/auth.validator";
import usersController from "../controllers/users.controller";

const router = Router();

router.post("/login", usersValidator.login, usersController.login);
router.post("/reg", usersValidator.reg, usersController.reg);
router.get("/auth", authValidator.checkToken, (req, res) => {
  res.send();
});
router.get("/balance", authValidator.checkToken, usersController.getBalance);

router.patch("/mod", authValidator.checkToken, (req, res) => {
  res.json({ message: "in developments" });
});
router.delete("/mod", authValidator.checkToken, (req, res) => {
  res.json({ message: "in developments" });
});

export default router;
