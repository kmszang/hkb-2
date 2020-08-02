import app from "../../app";
import request from "supertest";
import { ICategory } from "../../repository/category-repository";

test("get all categories", async (done) => {
	// given
	const response = await request(app).get("/api/category");

	const res = response.body as ICategory[];
	expect(res.length).toBe(10);
	done();
});
