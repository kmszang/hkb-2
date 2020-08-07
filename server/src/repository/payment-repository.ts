// SELECT P.name FROM Payment as P JOIN User_Payment_Method as R ON R.payment_id=P.id JOIN User as U ON U.id = R.user_id Where R.is_active=true;
import {
	insertQueryExecuter,
	selectQueryExecuter,
	updateOrDeleteQueryExecuter,
} from "../utils/query-executor";

export interface IPayment {
	id: number;
	name: string;
}

export interface IUserPayment {
	userId?: number;
	paymentId: number;
}

export class Payment {
	static async getAll() {
		const selectAllPayment = `
			SELECT
				*
			FROM
				Payment;
			`;
		return await selectQueryExecuter<IPayment>(selectAllPayment);
	}

	static async getOne(args: IUserPayment) {
		const { userId, paymentId } = args;

		const selectUsersPayment = `
			SELECT
				P.id, P.name
			FROM
				Payment as P
			JOIN
				User_Payment_Method as R ON R.payment_id=P.id
			JOIN
				User as U ON U.id = R.user_id
			WHERE
				U.id=${78} AND P.id=${paymentId} AND R.is_active=true
			;`;
		return await selectQueryExecuter<IPayment>(selectUsersPayment);
	}

	static async getUserSelectedPayment(userId: number) {
		const selectUsersPayment = `
			SELECT
				P.id, P.name
			FROM
				Payment as P
			JOIN
				User_Payment_Method as R ON R.payment_id=P.id
			JOIN
				User as U ON U.id = R.user_id
			WHERE
				U.id=${78} AND R.is_active=true
			;`;
		return await selectQueryExecuter<IPayment>(selectUsersPayment);
	}

	static async addPayment(args: IUserPayment) {
		const { userId, paymentId } = args;
		const insertUsersPayment = `
			INSERT INTO
				User_Payment_Method(payment_id, user_id)
			VALUES
				("${paymentId}", "${78}")
			;`;
		return await insertQueryExecuter(insertUsersPayment);
	}

	static async deletePayment(args: IUserPayment) {
		const { userId, paymentId } = args;
		const deleteUserPayment = `
			UPDATE
				User_Payment_Method
			SET
				is_active=false
		 	WHERE
				user_id=${78} AND payment_id=${paymentId}
		 	;`;
		return await updateOrDeleteQueryExecuter(deleteUserPayment);
	}
}
