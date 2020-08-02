import { Router } from "express";
import userRouter from "./user-routes";
import transactionRouter from "./transaction-routes";
import categoryRouter from "./category-routes";

const router = Router();

router.use("/api", userRouter);
router.use("/api/transaction", transactionRouter);
router.use("/api/category", categoryRouter);

export default router;
