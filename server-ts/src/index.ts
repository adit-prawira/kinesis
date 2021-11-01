import { app } from "./app";
import mongoose from "mongoose";

const startApp = async () => {
    if (process.env.NODE_ENV !== "production") {
        require("dotenv").config();
    }
    if (!process.env.DB_URL) {
        throw new Error("DB URL must be defined");
    }
    const mongoUri = process.env.DB_URL;
    try {
        await mongoose.connect(mongoUri);
    } catch (err) {
        console.error(err);
    }
    const PORT = process.env.PORT ? process.env.PORT : 5000;

    app.listen(PORT, () => {
        console.log("KINESIS BACKEND STATUS: Server is listening to PORT 3000");
    });
};
startApp();
