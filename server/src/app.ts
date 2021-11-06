import express, { Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { json } from "body-parser";
import { NotFoundError } from "./errors";
import { errorHandler } from "./middlewares";
import {
    currentUserRouter,
    signUpRouter,
    signInRouter,
    deleteAccountRouter,
    updateAccountRouter,
} from "./routes/auth-routes";
const app = express();
app.set("trust proxy", true);
app.use(cors());
app.use(json());

app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(deleteAccountRouter);
app.use(updateAccountRouter);

app.all("*", async () => {
    throw new NotFoundError();
});
app.use(errorHandler);

export { app };
