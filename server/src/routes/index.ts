import { Router } from "express";
import userRouter from "./user-routes";
import transactionRouter from "./transaction-routes";
import categoryRouter from "./category-routes";
import paymentRouter from "./payment-routes";

const router = Router();

router.use("/api", userRouter);
router.use("/api/transaction", transactionRouter);
router.use("/api/category", categoryRouter);
router.use("/api/payment", paymentRouter);

export default router;
