import { Router } from "express";
import { validateBody } from "../middlewares/validate-body";
import {
	getAllPayments,
	getUsersPayments,
	addNewPayment,
	deletePayment,
} from "../service/payment-service";
import { IUserPayment } from "../repository/payment-repository";

const paymentRouter = Router();

paymentRouter.post(
	"/",
	validateBody<IUserPayment>(["paymentId", "userId"]),
	addNewPayment
);

paymentRouter.delete(
	"/",
	validateBody<IUserPayment>(["paymentId", "userId"]),
	deletePayment
);

paymentRouter.get("/", getAllPayments);
paymentRouter.get("/:userId", getUsersPayments);

export default paymentRouter;
