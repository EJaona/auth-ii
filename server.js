require("dotenv").config();
const db = require("./db");
const helmet = require("helmet");
const express = require("express");
const jwt = require("jsonwebtoken");
const userRoute = require("./userRoute");
const loginRoute = require("./loginRoute");
const registerRoute = require("./registerRoute");

const locked = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decodeToken) => {
      if (err) {
        res.status(401).json({ message: "No token found" });
      } else {
        req.decodeToken = decodeToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "You are not authenticated" });
  }
};

const server = express();
server.use(helmet());
server.use(express.json());
server.use("/api/users", locked, userRoute);
server.use("/api/login", loginRoute);
server.use("/api/register", registerRoute);

module.exports = server;
