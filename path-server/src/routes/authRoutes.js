const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const user = new User({ email, password });

    await user.save();

    res.send("Made a post request");
});

module.exports = router;
