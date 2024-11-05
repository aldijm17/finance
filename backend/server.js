const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });

require("./routes/transaction.routes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});