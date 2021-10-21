const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.js");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.delete("/logout", userController.logout);

module.exports = router;