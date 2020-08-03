import {
	insertQueryExecuter,
	selectQueryExecuter,
	updateOrDeleteQueryExecuter,
} from "../utils/query-executor";

export interface ICreateTransaction {
	content: string;
	price: number;
	paymentId: number;
	userId: number;
	categoryId: number;
}

export interface ITransaction {
	id: number;
	content: string;
	price: number;
	paymentName: string;
	categoryName: string;
	createdAt: Date;
	isIncome: boolean;
	iconName: string;
}

export class Transaction {
	static async create(args: ICreateTransaction) {
		const { content, price, paymentId, userId, categoryId } = args;
		const userCreateQuery = `INSERT INTO Transaction(content, price, payment_id, user_id, category_id) VALUES("${content}", "${price}", "${paymentId}", "${userId}", "${categoryId}");`;

		return await insertQueryExecuter(userCreateQuery);
	}

	static async getOne(id: number) {
		const selectOneTransaction = `
		SELECT T.id, T.price, T.content, T.created_at as createdAt, P.name as paymentName,
		C.name as categoryName, C.is_income as isIncome, C.icon_name as iconName from Transaction as T
		JOIN Payment as P ON P.id = T.payment_id
		JOIN Category as C ON C.id = T.category_id
		WHERE T.id=${id} and T.is_active=true
		`;
		return await selectQueryExecuter<ITransaction>(selectOneTransaction);
	}
	// 카테고리, 내용, 결제수단, 금액순
	static async getAll() {
		const selectAllTransaction = `
			SELECT T.id, T.price, T.content, T.created_at as createdAt, P.name as paymentName,
			C.name as categoryName, C.is_income as isIncome, C.icon_name as iconName from Transaction as T
			JOIN Payment as P ON P.id = T.payment_id
			JOIN Category as C ON C.id = T.category_id
			WHERE T.is_active=true
			`;
		return await selectQueryExecuter<ITransaction>(selectAllTransaction);
	}

	// static async update(args: Partial<ICreateTransaction>) {
	// 	const selectAllTransaction = `SELECT * FROM Transaction;`;
	// 	return await selectQueryExecuter<ITransaction>(selectAllTransaction);
	// }

	static async delete(id: number) {
		const deleteUserQuery = `DELETE FROM Transaction WHERE id=${id};`;
		return await updateOrDeleteQueryExecuter(deleteUserQuery);
	}
}
