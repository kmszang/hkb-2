import { Request, Response, NextFunction } from "express";
import { ERROR } from "../const";

export const validateBody = <T>(keys: (keyof T)[]) => (
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
