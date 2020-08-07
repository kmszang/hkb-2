import {
  insertQueryExecuter,
  selectQueryExecuter,
  updateOrDeleteQueryExecuter,
} from "../utils/query-executor";

export interface ICreateTransaction {
  content: string;
  price: number;
  paymentId: number;
  userId?: number;
  categoryId: number;
  date: string;
}

export interface IUpdateTransaction extends Partial<ICreateTransaction> {
  id: number;
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
  categoryId: number;
}

export class Transaction {
  static async create(args: ICreateTransaction) {
    const { content, price, paymentId, userId, categoryId, date } = args;
    const userCreateQuery = `
		INSERT INTO
			Transaction(content, price, payment_id, user_id, category_id, created_at)
		VALUES
			("${content}", "${price}", "${paymentId}", "${userId}", "${categoryId}", "${date}");`;
    return await insertQueryExecuter(userCreateQuery);
  }
  static async getOne(id: number) {
    const selectOneTransactionQuery = `
		SELECT
			T.id, T.price, T.content, T.created_at as createdAt, P.name as paymentName,
			C.name as categoryName, C.is_income as isIncome, C.icon_name as iconName,
			C.id as categoryId
		FROM
			Transaction as T
		JOIN
			Payment as P ON P.id = T.payment_id
		JOIN
			Category as C ON C.id = T.category_id
		WHERE
			T.id=${id} and T.is_active=true
		`;
    return await selectQueryExecuter<ITransaction>(selectOneTransactionQuery);
  }
  static async getAll(date: string) {
    const [year, month] = date.split("-");

    const selectAllTransactionQuery = `
			SELECT
				T.id, T.price, T.content, T.created_at as createdAt, P.name as paymentName,
				C.name as categoryName, C.is_income as isIncome, C.icon_name as iconName,
				C.id as categoryId
			FROM
				Transaction as T
			JOIN
				Payment as P ON P.id = T.payment_id
			JOIN
				Category as C ON C.id = T.category_id
			WHERE
				T.is_active=true and YEAR(T.created_at)=${year} and MONTH(T.created_at)=${month}
			`;
    return await selectQueryExecuter<ITransaction>(selectAllTransactionQuery);
  }

  static async update(args: Partial<IUpdateTransaction>) {
    const { id, ...rest } = args;

    const columnName = {
      paymentId: "payment_id",
      userId: "user_id",
      categoryId: "category_id",
      date: "created_at",
    };

    const updateTemplate = Object.entries(rest)
      .filter(([key, value]) => value !== undefined)
      .map(
        ([key, value]) =>
          `${columnName[key] || key}=${
            typeof value === "number" ? value : `"${value}"`
          }`
      )
      .join(", ");

    const updateQuery = `
			UPDATE
				Transaction
			SET
				${updateTemplate}
			WHERE
				id=${id}
			;
		;`;
    return await updateOrDeleteQueryExecuter(updateQuery);
  }

  static async delete(id: number) {
    const deleteUserQuery = `
			UPDATE
				Transaction
			SET
				is_active=false
			WHERE
				id=${id};
		`;
    return await updateOrDeleteQueryExecuter(deleteUserQuery);
  }
}
