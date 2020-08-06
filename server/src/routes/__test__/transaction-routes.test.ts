import app from "../../app";
import request from "supertest";
import {
	ICreateTransaction,
	Transaction,
	ITransaction,
} from "../../repository/transaction-repository";
import { InsufficientBodyError } from "../../errors/Insufficient-body";

test("create transaction with proper value", async (done) => {
	// given
	const validTransaction: ICreateTransaction = {
		date: "2020-08",
		content: "for testing",
		price: 5000,
		paymentId: 4,
		userId: 78,
		categoryId: 1,
	};

	const response = await request(app)
		.post("/api/transaction")
		.send(validTransaction);

	const res = response.body as ITransaction;

	expect(res.price).toBe(validTransaction.price);
	expect(res.content).toBe(validTransaction.content);

	Transaction.delete(res.id);
	done();
});

test("get all transactions", async (done) => {
	// given
	const response = await request(app).get("/api/transaction");
	expect(response.body instanceof Array).toBeTruthy();
	done();
});

// test("Sign up with wrong email format", async (done) => {
// 	// given
// 	const invalidUserInfo: UserInfo = {
// 		userId: "fameu6e",
// 		password: "12345678",
// 		email: "io@",
// 		name: "장해민",
// 		phone: "010-5520-3618",
// 	};

// 	// const expectedResult: SignUpResponse = {
// 	//   email: {
// 	//     res: false,
// 	//     err: ErrMsg.invalidEmail,
// 	//   },
// 	// }

// 	const response = await request(app)
// 		.post("/api/sign-up")
// 		.send(invalidUserInfo);

// 	await deleteUser({ userId: invalidUserInfo.userId });

// 	// expect(response.body).toEqual(expectedResult)

// 	done();
// });
