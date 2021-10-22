const express = require("express");
const router = express.Router();

const prodController = require("../controllers/products.js");
const verifyJWT = require("../middleware/verifyJWT.js");
const verifyStore = require("../middleware/verifyStore.js");

router.get("/store:storeid", verifyJWT.verifyJWT, verifyStore.verifyStore, prodController.getItems); //storeid is req.params.storeid
router.post("/additem", verifyJWT.verifyJWT, prodController.addItem);
router.patch("/edititem", verifyJWT.verifyJWT, prodController.editItem);
router.delete("removeitem:id", verifyJWT.verifyJWT, prodController.removeItem);

module.exports = router;