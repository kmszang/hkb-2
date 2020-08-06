import app from "../../app";
import request from "supertest";
import { IPayment, IUserPayment } from "../../repository/payment-repository";

test("get all payments", async (done) => {
	// given
	const response = await request(app).get("/api/payment");

	const res = response.body as IPayment[];
	expect(res.length).toBe(10);
	done();
});

test("get user 78's payments", async (done) => {
	// given
	const response = await request(app).get("/api/payment/78");

	const res = response.body as IPayment[];
	expect(res.length).toBe(3);
	done();
});

test("add new card payment to user 78, ", async (done) => {
	const userPayment: IUserPayment = {
		userId: 78,
		paymentId: 5,
	};

	const response = await request(app).post("/api/payment").send(userPayment);

	const res = response.body;
	expect(res).toBe(5);
	done();
});

test("remove card payment to user 78, ", async (done) => {
	const userPayment: IUserPayment = {
		userId: 78,
		paymentId: 5,
	};

	const response = await request(app)
		.delete("/api/payment")
		.send(userPayment);

	const res = response.body;
	expect(res).toBe(5);
	done();
});
