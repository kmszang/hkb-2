import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import router from "./routes";
import path from "path";

const app = express();

app.use(bodyParser.json());

// Serve static files at `public` directory
app.use(express.static(path.join(__dirname, "/public")));

app.use(router);

export default app;
