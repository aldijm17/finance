const express = require('express');
const router = express.Router();
const { signin } = require("../controllers/auth.controller");
const verifyToken = require("../middleware/auth.middleware");

// Route untuk login
router.post("/signin", signin);

// Route untuk konten yang dilindungi
router.get("/protected", verifyToken, (req, res) => {
  res.status(200).send("Protected content!");
});

module.exports = router;
