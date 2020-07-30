import { Router } from "express";
import userRouter from "./user-routes";
import transactionRouter from "./transaction-routes";

const router = Router();

router.use("/api", userRouter);
router.use("/api", transactionRouter);

export default router;
