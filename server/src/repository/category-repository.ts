import { selectQueryExecuter } from "../utils/query-executor";

export interface ICategory {
	id: number;
	name: string;
	iconName: string;
	isIncome: boolean;
}

export class Category {
	static async getAll() {
		const selectAllTransaction = `
			SELECT id, name, icon_name as iconName, is_income as isIncome FROM Category;
			`;
		return await selectQueryExecuter<ICategory>(selectAllTransaction);
	}
}
