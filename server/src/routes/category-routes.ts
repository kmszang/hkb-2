import { Router } from "express";
import { getAllCategory } from "../service/category-service";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategory);

export default categoryRouter;
