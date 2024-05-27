const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const cron = require("node-cron");
//내부 모듈 호출
const indexRouter = require("./routes/index");
require("dotenv").config();

// DB Config
const db = process.env.MONGO_URI;
const app = express();
//const caver = new Caver(process.env.KLAYTN_NODE_URL);
const PORT = process.env.PORT || 5000;
// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
