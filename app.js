const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const Caver = require("caver-js");
require("dotenv").config();
// DB Config
const db = process.env.MONGO_URI;
const app = express();
const caver = new Caver(process.env.KLAYTN_NODE_URL);
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
