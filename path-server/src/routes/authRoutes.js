const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new User({ email, password });
        await user.save();

        // Token for validation purposes
        const token = jwt.sign(
            {
                userId: user._id,
            },
            "SECRET_KEY"
        );

        res.send({ token });
    } catch (e) {
        // status code of invalid data.
        res.status(422).send(e.message);
    }
});

module.exports = router;
