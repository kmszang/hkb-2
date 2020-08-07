import { Request, Response } from "express";
import { DatabaseError } from "../errors/database-error";
import { Payment, IUserPayment } from "../repository/payment-repository";

export const getAllPayments = async (req: Request, res: Response) => {
  const [AllPayments, fetchError] = await Payment.getAll();

  if (fetchError) {
    throw new DatabaseError(fetchError);
  }

  res.json(AllPayments);
};

export const getUsersPayments = async (req: Request, res: Response) => {
  //   const { userId } = req.params;
  const user = req.user;
  const [userPayment, fetchError] = await Payment.getUserSelectedPayment(
    +user.id
  );

  if (fetchError) {
    throw new DatabaseError(fetchError);
  }

  res.json(userPayment);
};

export const addNewPayment = async (req: Request, res: Response) => {
  const args = req.body as IUserPayment;
  args["userId"] = req.user.id;
  const [existedPayment, fetchError] = await Payment.getOne(args);

  if (existedPayment.length !== 0) {
    res.json(args.paymentId);
    return;
  }

  const [insertedtransactionId, insertError] = await Payment.addPayment(args);

  if (insertError) {
    throw new DatabaseError(insertError);
  }

  res.json(args.paymentId);
};

export const deletePayment = async (req: Request, res: Response) => {
  const args = req.body as IUserPayment;
  const [removedRows, removeError] = await Payment.deletePayment(args);

  if (removeError || removedRows !== 1) {
    throw new DatabaseError(removeError);
  }

  res.json(args.paymentId);
};
