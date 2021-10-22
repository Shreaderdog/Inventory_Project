const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");

exports.login = function(req, res) {
    const userLoggingIn = req.body;

    User.findOne({ username: userLoggingIn.username.toLowerCase() })
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
                                if (err) {
                                    return res.json({ message: err})
                                } else {
                                
                                res.cookie('jwt_token', token, {
                                    expires: new Date(Date.now() + 3 * 3600000),  //expires in 3 hours
                                    httpOnly: true,
                                    secure: process.env.production,
                                    sameSite: 'strict'
                                 })
                                 res.send();   
                                }
                            }
                        )
                    } else {
                        return res.json({
                            message: "Invalid Username or Password"
                        })
                    }
                })
                .catch((err) => {
                    console.log(err);
                    return res.json({ message: "An error has occurred. Please try again" });
                })
        })
        .catch((err) => {
            console.log(err);
            return res.json({ message: "An error has occurred. Please try again" });
        })
}

exports.register = function(req, res) {
    const userInfo = req.body;

    User.findOne({ username: userInfo.username })
        .then((user) => {
            if(!user) {
                User.findOne({ employeeNum: userInfo.employeeNum })
                    .then((user) => {
                        if(!user) {
                            bcrypt.hash(userInfo.password, 10)
                                .then((pass) => {
                                    const dbUser = new User({
                                        employeeNum: userInfo.employeeNum,
                                        username: userInfo.username,
                                        password: pass,
                                        fName: userInfo.fName,
                                        lName: userInfo.lName,
                                        role: userInfo.role,
                                        store: Number(userInfo.store)
                                    });
                                    
                                    dbUser.save(function(err) {
                                        if(err) return console.log(err);
                                    })
                                    return res.json({message: "Success"});
                                })
                        } else {
                            return res.json({ message: "Account with username or employee number already exists"});
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        return res.json({ message: "An error has occurred. Please try again" });
                    })
            } else {
                return res.json({ message: "Account with username or employee number already exists"});
            }
        })
        .catch((err) => {
            console.log(err);
            return res.json({ message: "An error has occurred. Please try again" });
        })
}

exports.logout = function(req, res) {
    res.clearCookie("jwt_token");
    res.json({ message: "Logged out successfuly", isLoggedIn: false});
    res.send();
}