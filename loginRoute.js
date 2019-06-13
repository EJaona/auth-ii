const db = require("./db");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const loginRoute = express.Router();

const createToken = user => {
  payload = {
    username: user.username
  };

  secret = process.env.SECRET;

  options = {
    expiresIn: "10m"
  };

  return jwt.sign(payload, secret, options);
};

loginRoute.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db
      .select()
      .from("user")
      .where({ username: username })
      .first();

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = createToken(user);
      res.status(200).json({
        message: `successful login. Welcome, ${user.name}`,
        token
      });
    } else {
      res.status(401).json({ message: "username/email combo is incorrect" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = loginRoute;
