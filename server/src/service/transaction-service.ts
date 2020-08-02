import { Request, Response } from "express";
import { DatabaseError } from "../errors/database-error";
import {
	Transaction,
	ICreateTransaction,
} from "../repository/transaction-repository";

export const createNewTransaction = async (req: Request, res: Response) => {
	const args = req.body as ICreateTransaction;

	const [insertedtransactionId, insertError] = await Transaction.create(args);
	if (insertError) {
		throw new DatabaseError(insertError);
	}

	const [[newTransaction, _], fetchError] = await Transaction.getOne(
		insertedtransactionId
	);

	if (fetchError) {
		throw new DatabaseError(fetchError);
	}

	res.json(newTransaction);
};

export const getAllTransactions = async (req: Request, res: Response) => {
	const [allTransactions, fetchError] = await Transaction.getAll();

	if (fetchError) {
		throw new DatabaseError(fetchError);
	}

	res.json(allTransactions);
};
