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
    updateHealthProfileRouter,
    accountProfilePictureRouter,
} from "./routes/auth-routes";

import {
    createTrackRouter,
    getTrackRouter,
    getTracksRouter,
    deleteTrackRouter,
} from "./routes/track-routes";

const app = express();

app.set("trust proxy", true);
app.use(cors());
app.use(json());

// routes that handle user/auth service
app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(deleteAccountRouter);
app.use(updateAccountRouter);
app.use(updateHealthProfileRouter);
app.use(accountProfilePictureRouter);

// routes that handle track services
app.use(createTrackRouter);
app.use(getTrackRouter);
app.use(getTracksRouter);
app.use(deleteTrackRouter);

app.all("*", async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
