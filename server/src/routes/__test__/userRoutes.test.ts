import app from "../../app";
import request from "supertest";
import { ISignUpBody } from "../../repository/user-repository";

test("Sign up with all valid information", async (done) => {
	// given
	const validUserInfo: ISignUpBody = {
		userId: "fameu5e",
		password: "12345678",
		name: "andy",
	};

	const response = await request(app)
		.post("/api/sign-up")
		.send(validUserInfo);

	// expect(response.body).toEqual(expectedResult)
	console.log(response.body);
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
