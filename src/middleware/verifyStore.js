const { db } = require("../models/user.js");
const User = require("../models/user.js");

exports.verifyStore = function (req, res, next) {

    User.findOne({ username: req.user.username })
        .then((dbUser) => {
            if (!dbUser) {
                return res.json({ message: "An error occured. Try again"});
            }
            if (req.user.store == req.params.storeid || dbUser.role == "owner") {
                next();
            } else {
                return res.status(403).json({ message: "Insufficient Access"});
            }
        })
}