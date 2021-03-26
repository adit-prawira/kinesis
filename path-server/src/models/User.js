const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Data structure of user to be saved in mongoose database
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre("save", function (next) {
    // if user doesn't change his or her password
    // go to the next process otherwise hash the newly
    // created/modified password
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        // if there is an error do not compute any hashing and move on to the next process.
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }

            // change the password in the data base to the hashed password not the actual
            // password
            user.password = hash;

            // after that move on to save the user to the database.
            next();
        });
    });
});

// login process attempted by existing user
userSchema.methods.comparePassword = function (candidatePassword) {
    // with already salted password
    const user = this;

    return new Promise((resolve, reject) => {
        // compare the password user trying to log in with and
        // compare it withe the salted password of the user in the database
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            // if there is an error reject promise and send the error messages
            if (err) {
                return reject(err);
            }

            // if the used password is not a match with the salted password stored in
            // the database then reject promise and send boolean value of false
            if (!isMatch) {
                return reject(false);
            }

            // Resolve promise with true to indicate valid log in process
            resolve(true);
        });
    });
};

mongoose.model("User", userSchema);
