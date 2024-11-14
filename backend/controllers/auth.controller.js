const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required!" });
  }

  try {
    // Mencari user berdasarkan username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "Username not found." });
    }

    // Memeriksa password
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid Password!" });
    }

    // Membuat token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
    console.log("JWT Secret:", process.env.JWT_SECRET);

    res.status(200).json({
      id: user.id,
      username: user.username,
      accessToken: token
    });
  } catch (error) {
    res.status(500).json({ message: "Error during signin process", error: error.message });
  }
};

module.exports = { signin };
