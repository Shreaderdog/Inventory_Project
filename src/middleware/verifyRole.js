const User = require("../models/user.js");

exports.verifyRole = function (req, res, next) {
    const operation = req.body;

    User.findOne({ username: req.user.username })
        .then((dbUser) => {
            if (!dbUser) {
                return res.json({ message: "An error occured. Try again"});
            }
            if (req.user.role == operation.reqRole) {
                next();
            } else {
                return res.status(403).json({ message: "Insufficient Access"});
            }
        })
}