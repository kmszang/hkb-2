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

const transactionRouter = Router();

transactionRouter.post(
	"/",
	validateBody<ICreateTransaction>([
		"content",
		"price",
		"paymentId",
		"userId",
		"categoryId",
	]),
	createNewTransaction
);

transactionRouter.get("/:date", getAllTransactions);
transactionRouter.put(
	"/",
	validateBody<IUpdateTransaction>(["id"]),
	updateTransaction
);
transactionRouter.delete("/:id", deleteTransaction);

export default transactionRouter;
