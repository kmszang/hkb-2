import { Request, Response, NextFunction } from "express";
import { ISignUpBody } from "../repository/user-repository";
import { ERROR } from "../const";
// interface IAttr extends Partial<ISignUpBody> {}

export const validateBody = <T>(keys: (keyof T)[]) => (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { body } = req;

	for (const key of keys) {
		if (body[key]) {
			continue;
		}

		next(new Error(ERROR.INSUFFICIENT_BODY));
	}

	next();
};
