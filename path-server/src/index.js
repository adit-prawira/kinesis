if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const mongoUri = process.env.DB_URL;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("Connected to Database");
});

mongoose.connection.on("error", () => {
    console.error("Error connecting to mongo database");
});

app.get("/", (req, res) => {
    res.send("hi");
});

app.listen(3000, () => {
    console.log("Listening to port 3000");
});
