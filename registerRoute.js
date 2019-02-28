const express = require("express");
const db = require("./db");
const bcrypt = require("bcryptjs");

const registerRoute = express.Router();

registerRoute.post("/", async (req, res) => {
  const newUser = req.body;

  const hash = bcrypt.hashSync(newUser.password, 14);

  newUser.password = hash;

  const registered = await db.from("user").insert(newUser);
  res.status(200).json({ message: "Registered", newUser });
});

module.exports = registerRoute;
