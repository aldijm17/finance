module.exports = (app) => {
    // const express = require("express");  
    const transactions = require("../controllers/transaction.controller.js");
    const router = require("express").Router();
    const multer = require("multer");
    const path = require("path");
    // const router = express.Router();

    // Konfigurasi Multer
    const storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, "uploads/"),
      filename: (req, file, cb) => cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    });

    const upload = multer({ storage });


    router.post("/", upload.single("buktiTransfer"), transactions.create);
    router.get("/", transactions.findAll);
    router.get("/dashboard", transactions.getDashboardSummary);
    app.use('/api/transactions', router);
  };