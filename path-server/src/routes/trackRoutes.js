const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");
const router = require("./authRoutes");
const Track = mongoose.model("Track");

const routes = express.Router();

// every routes will compute requireAuth middleware before continuing to the next process
router.use(requireAuth);

router.get("/tracks", async (req, res) => {
    // find all tracks owned by the logged in user and find id by user's id
    const tracks = await Track.find({ userId: req.user._id });

    res.send(tracks);
});

module.exports = router;
