const express = require("express");
const axios = require("axios");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const cron = require("node-cron");
const cors = require('cors')
//내부 모듈 호출
const indexRouter = require("./routes/index");
require("dotenv").config();

// DB Config
// const db = process.env.MONGO_URI;
const app = express();

app.use(cors())
app.use("/", indexRouter);
//const caver = new Caver(process.env.KLAYTN_NODE_URL);
const PORT = process.env.PORT || 3000;
// Connect to MongoDB
app.listen(3000, () => console.log('listening to port 3000'));
// mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.MONGODB_QUERY}?retryWrites=true&w=majority`).then(() => {
//   app.listen(3000, () => console.log('listening to port 3000'));
// }).catch(err => console.log(err));


