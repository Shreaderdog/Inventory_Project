const express = require("express");
const router = express.Router();

const prodController = require("../controllers/products.js");
const verifyJWT = require("../middleware/verifyJWT.js");
const verifyRole = require("../middleware/verifyRole.js");

router.get("/store:id", verifyJWT, verifyRole, prodController.getItems); //id is req.params.id
router.post("/additem", verifyJWT, verifyRole, prodController.addItem);
router.patch("/edititem:id", verifyJWT, verifyRole, prodController.editItem);
router.delete("removeitem:id", verifyJWT, verifyRole, prodController.removeItem);

module.exports = router;