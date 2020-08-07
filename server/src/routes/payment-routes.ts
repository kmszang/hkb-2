import { Router } from "express";
import { validateBody } from "../middlewares/validate-body";
import {
  getAllPayments,
  getUsersPayments,
  addNewPayment,
  deletePayment,
} from "../service/payment-service";
import { IUserPayment } from "../repository/payment-repository";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const paymentRouter = Router();

paymentRouter.post(
  "/",
  isAuthenticated,
  validateBody<IUserPayment>(["paymentId"]),
  addNewPayment
);

paymentRouter.delete(
  "/",
  isAuthenticated,
  validateBody<IUserPayment>(["paymentId"]),
  deletePayment
);

paymentRouter.get("/", getAllPayments);
paymentRouter.get("/", isAuthenticated, getUsersPayments);

export default paymentRouter;
