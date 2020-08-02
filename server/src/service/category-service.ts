import { Request, Response } from "express";
import { DatabaseError } from "../errors/database-error";
import { Category } from "../repository/category-repository";

export const getAllCategory = async (req: Request, res: Response) => {
	const [allCategories, fetchError] = await Category.getAll();

	if (fetchError) {
		throw new DatabaseError(fetchError);
	}

	res.json(allCategories);
};
