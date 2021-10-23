const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.js");
const verifyJWT = require("../middleware/verifyJWT.js");

router.post("/auth", verifyJWT.verifyJWT, userController.auth);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.delete("/logout", userController.logout);

module.exports = router;