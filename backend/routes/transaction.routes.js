module.exports = (app) => {
    const transactions = require("../controllers/transaction.controller.js");
    const router = require("express").Router();
  
    router.post("/", transactions.create);
    router.get("/", transactions.findAll);
    router.get("/dashboard", transactions.getDashboardSummary);
    app.use('/api/transactions', router);
  };