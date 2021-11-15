// user.js
// User Model
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    employeeNum: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required:true
    },
    role: {
        type:String,
        required: true
    },
    store: {
        type: Number,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;