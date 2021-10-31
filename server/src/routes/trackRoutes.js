const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");
const Track = mongoose.model("Track");
const router = express.Router();

// every routes will compute requireAuth middleware before continuing to the next process
router.use(requireAuth);

router.get("/api/tracks", async (req, res) => {
    // find all tracks owned by the logged in user and find id by user's id
    const tracks = await Track.find({ userId: req.user._id });
    res.send(tracks);
});

router.post("/api/tracks", async (req, res) => {
    const { name, locations } = req.body;

    // user input invalid name or locations when creating a new track,
    // then send invalid data status code with error custom messages
    if (!name || !locations) {
        return res.status(422).send({
            error: "you must provide a name and locations",
        });
    }

    // In the case there is an error (invalid data input) while creating a new track
    // send invalid data status code
    try {
        const track = new Track({
            name,
            locations,
            userId: req.user._id,
        });

        // save new track to the database
        await track.save();
        res.send(track);
    } catch (e) {
        res.status(422).send({ error: "Invalid locations" });
    }
});

module.exports = router;
