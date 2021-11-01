import express, { Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { json } from "body-parser";
const app = express();
app.set("trust proxy", true);
app.use(cors());
app.use(json());

export { app };
