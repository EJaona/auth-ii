const express = require("express");
const db = require("./db");
const userRoute = express.Router();

userRoute.get("/", async (req, res) => {
  const users = await db.select("id", "name", "username").from("user");
  res.status(200).json(users);
});

module.exports = userRoute;
