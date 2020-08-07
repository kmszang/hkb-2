import { Router } from "express";
import { validateBody } from "../middlewares/validate-body";
import {
  createNewTransaction,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
} from "../service/transaction-service";
import {
  ICreateTransaction,
  IUpdateTransaction,
} from "../repository/transaction-repository";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const transactionRouter = Router();

transactionRouter.post(
  "/",
  isAuthenticated,
  validateBody<ICreateTransaction>([
    "content",
    "price",
    "paymentId",
    "categoryId",
  ]),
  createNewTransaction
);

transactionRouter.get("/:date", isAuthenticated, getAllTransactions);
transactionRouter.put(
  "/",
  isAuthenticated,
  validateBody<IUpdateTransaction>(["id"]),
  updateTransaction
);
transactionRouter.delete("/:id", isAuthenticated, deleteTransaction);

export default transactionRouter;
