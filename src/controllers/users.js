const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");

exports.login = function (req, res) {
    const userLoggingIn = req.body;

    User.findOne({ username: userLoggingIn.username })
        .then((dbUser) => {
            if (!dbUser) {
                return res.json({ message: "Invalid Username or Password"});
            }
            
            bcrypt.compare(userLoggingIn.password, dbUser.password)
                .then((isCorrect) => {
                    if (isCorrect) {
                        const payload = {
                            username: dbUser.username,
                            fname: dbUser.fName,
                            lname: dbUser.lName,
                            role: dbUser.role,
                            store: dbUser.store
                        };
                        jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            {expiresIn: 3600},
                            (err, token) => {
                                if (err) return res.json({ message: err})
                                return res.json({
                                    message: "Success",
                                    token: "Bearer " + token
                                })
                            }
                        )
                    } else {
                        return res.json({
                            message: "Invalid Username or Password"
                        })
                    }
                })
        })
}

