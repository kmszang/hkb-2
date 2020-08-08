import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import router from "./routes";
import path from "path";
import cors from "cors";
import { CustomError } from "./errors/custom-error";
import passport from "./passport";
import session from "express-session";
const NedbStore = require("nedb-session-store")(session);
const app = express();

app.use(
	cors({
		origin: true,
		credentials: true,
	})
);
app.use(bodyParser.json());

app.use(
	session({
		secret: "cats",
		store: new NedbStore({
			filename: "sessionStore.db",
		}),
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Serve static files at `public` directory
app.use(express.static(path.join(__dirname, "../public")));

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

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/index.html"));
});

export default app;
