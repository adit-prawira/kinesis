const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");

router.post("/api/signup", async (req, res) => {
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
        console.log(e.message);
        // status code of invalid data.
        res.status(422).send(e.message);
    }
});

router.post("/api/signin", async (req, res) => {
    const { email, password } = req.body;

    // return early and send invalid data status code when the user trying to log in
    // with invalid email/password (note: invalid means that it is possible user didn't
    // input any email / password)
    if (!email || !password) {
        return res
            .status(422)
            .send({ error: "Must provide valid email and password" });
    }

    // find email in mongoose database
    const user = await User.findOne({ email });

    // if user does not exist in data base send not found status code
    if (!user) {
        return res.status(404).send({ error: "Invalid email or password" });
    }

    try {
        // send token when used password is a match
        await user.comparePassword(password);
        const token = jwt.sign({ userId: user._id }, "SECRET_KEY");
        res.send({ token });
    } catch (e) {
        // return early to indicate invalid input can be email/password.
        // makes it harder for any malicious users.
        return res.status(422).send({ error: "Invalid email or password" });
    }
});

module.exports = router;
