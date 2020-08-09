import {
	insertQueryExecuter,
	selectQueryExecuter,
	updateOrDeleteQueryExecuter,
} from "../utils/query-executor";

export interface IUser {
	id: number;
	name: string;
	user_id: string;
	social_id: string;
	password: string;
}

export interface ISocialUser {
	social_id: number;
	name: string;
}

export interface ISignUpBody {
	name: string;
	userId: string;
	password: string;
}

export interface ILoginBody {
	userId: string;
	password: string;
}

export interface ISocialLoginBody {
	socialId: string;
}

export class User {
	static async createWithId(args: ISignUpBody) {
		const { name, userId, password } = args;
		const userCreateQuery = `INSERT INTO User(name, user_id, password) VALUES("${name}", "${userId}", "${password}")`;

		return await insertQueryExecuter(userCreateQuery);
	}

	static async getWithUserId(userId: string) {
		const getUserWithUserIdQuery = `SELECT user_id as userId, name, password, id FROM User WHERE user_id="${userId}";`;
		return await selectQueryExecuter<IUser>(getUserWithUserIdQuery);
	}

	static async getWithId(id: number) {
		const getUserWithIdQuery = `SELECT user_id as userId, name, password, id FROM User WHERE id=${id};`;
		return await selectQueryExecuter<IUser>(getUserWithIdQuery);
	}

	static async getWithSocialId(socialId: number) {
		const getUserWithSocialIdQuery = `SELECT user_id as userId, name, password, id FROM User WHERE social_id=${socialId};`;
		return await selectQueryExecuter<IUser>(getUserWithSocialIdQuery);
	}

	static async createWithSocial(args: ISocialUser) {
		const { name, social_id } = args;
		const createUserWithSocialIdQuery = `INSERT INTO User(name, social_id) VALUES("${name}", "${social_id}")`;
		return await insertQueryExecuter(createUserWithSocialIdQuery);
	}

	static async deleteWithId(id: number) {
		const deleteUserQuery = `DELETE FROM User WHERE id=${id};`;
		return await updateOrDeleteQueryExecuter(deleteUserQuery);
	}
}
