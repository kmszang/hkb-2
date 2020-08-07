import { Request, Response } from "express";
import { DatabaseError } from "../errors/database-error";
import {
  Transaction,
  ICreateTransaction,
  IUpdateTransaction,
} from "../repository/transaction-repository";

export const createNewTransaction = async (req: Request, res: Response) => {
  const args = req.body as ICreateTransaction;
  const userId = req.user.id;
  args["userId"] = userId;
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
  const { date } = req.params;
  const [allTransactions, fetchError] = await Transaction.getAll(date);

  if (fetchError) {
    throw new DatabaseError(fetchError);
  }
  res.json(allTransactions);
};

export const updateTransaction = async (req: Request, res: Response) => {
  const args = req.body as IUpdateTransaction;
  const [updatedRows, updateError] = await Transaction.update(req.body);

  if (updateError || updatedRows !== 1) {
    throw new DatabaseError(updateError);
  }

  const [[updatedTransaction, _], fetchError] = await Transaction.getOne(
    args.id
  );

  if (fetchError) {
    throw new DatabaseError(fetchError);
  }

  res.json(updatedTransaction);
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const [removedRows, removeError] = await Transaction.delete(parseInt(id));

  if (removeError || removedRows !== 1) {
    throw new DatabaseError(removeError);
  }

  res.json(id);
};
