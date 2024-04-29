const express = require("express");
const router = express.Router();
const { submitForm, getAllCards } = require("../controllers/catController");

router.post("/api/cards", submitForm);
router.get("/api/cards", getAllCards);

module.exports = router;
