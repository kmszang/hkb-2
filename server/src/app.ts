import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import router from "./routes";
import path from "path";
import cors from "cors";
import { CustomError } from "./errors/customError";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve static files at `public` directory
app.use(express.static(path.join(__dirname, "/public")));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof CustomError) {
		res.status(err.statusCode);
		res.json(err.message);
		return;
	}

	console.error("invalid error type : ", err);
	res.json("");
});

export default app;
