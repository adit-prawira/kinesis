const mongoose = require("mongoose");

const pointSchema = new mongoose.Schema({
    timestamp: Number,
    coords: {
        latitude: Number,
        longitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number,
        speed: Number,
    },
});

const trackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        // making sure that userId is pointing at the instance of the User model
        ref: "User",
    },
    name: {
        type: String,
        default: "",
    },

    // location will contains list of pointSchema
    locations: [pointSchema],
});

mongoose.model("Track", trackSchema);
