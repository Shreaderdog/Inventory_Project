// verifyJWT.js
const jwt = require("jsonwebtoken");

exports.verifyJWT = function(req, res, next) {
    const token = req.cookies.jwt_token;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.json({
                isLoggedIn: false,
                message: "Failed to Authenticate"
            })
            req.user = {};
            req.user.username = decoded.username;
            req.user.fname = decoded.fname;
            req.user.lname = decoded.lname;
            req.user.role = decoded.role;
            req.user.store = decoded.store;
            next();
        })
    } else {
        return res.json({ message: "Incorrect token given", isLoggedIn: false})
    }
}