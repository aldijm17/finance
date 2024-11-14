require('dotenv').config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sinkronisasi database
db.sequelize.sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });

// Daftarkan route auth
app.use("/api/auth", authRoutes);
require("./routes/transaction.routes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
