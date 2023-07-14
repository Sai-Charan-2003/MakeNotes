const mongoose = require("mongoose");
const userSchema = require("../schema");
// const express = require("express");
// const app = express();

const modelMiddleware = (req, res, next) => {
  res.locals.userModel = mongoose.model("notes", userSchema);
  next();
};

module.exports = { modelMiddleware };
