const mongoose = require("mongoose");
//tokenID, addrToji, timeStamp, owner, area, historycount,
//code, note, price
const estateSchema = mongoose.Schema({
  tokenID: {
    type: Number,
    required: true,
  },
  addrToji: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Number,
    required: true,
  },
  owner: {
    type: Number, //Hex
    required: true,
  },
  area: {
    type: Number,
  },
  historyCount: {
    type: Number,
  },
  code: {
    type: Number,
  },
  note: {
    type: String,
  },
  price: {
    type: Number,
  },
  history: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const estate = mongoose.model("estate", estateSchema);
module.exports = estate;
