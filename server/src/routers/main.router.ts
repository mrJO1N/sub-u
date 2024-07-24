import { Router } from "express";
import usersRouter from "./users.router";

const router = Router();

router.use("/users", usersRouter);

router.post("/", (req, res) => {
  res.send("hello");
});

export default router;
