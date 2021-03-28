// User validation pre-processing middleware with valid jsonwebtoken.
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
    // If user has a valid jsonwebtoken call next() function
    // to go to the next existing middleware used in a routes
    // REMINDER: authorization === "Bearer jbhkadjshdsak"
    const { authorization } = req.headers;
    if (!authorization) {
        // Send status code of forbidden error
        return res.status(401).send({ error: "You must be logged in!" });
    }

    // "Bearer jbhkadjshdsak" --> "jbhkadjshdsak"
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, "SECRET_KEY", async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: "You must be logged in!" });
        }

        //extract userId from payload
        const { userId } = payload;

        // find user with the given id in mongoose database
        const user = await User.findById(userId);

        //request from validated user
        req.user = user;

        // go to the next process/middleware
        next();
    });
};
