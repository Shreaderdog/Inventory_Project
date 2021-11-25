// users.js
const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.js");
const verifyJWT = require("../middleware/verifyJWT.js");

router.post("/auth", verifyJWT.verifyJWT, userController.auth);
router.post("/login", userController.login);
router.get("/info", verifyJWT.verifyJWT, userController.getInfo);
router.post("/register", verifyJWT.verifyJWT, userController.register);
router.delete("/logout", userController.logout);

module.exports = router;