import { Router } from "express";
import usersRouter from "./users.router";
import transfersRouter from "./transfers.router";
import depositRouter from "./deposit.router";

const router = Router();

router.use("/users", usersRouter);
router.use("/transfers", transfersRouter);
router.use("/deposit", depositRouter);

router.post("/", (req, res) => {
  res.send("hello");
});

export default router;
