const mongoose = require("mongoose");
const historySchema = {
  timeStamp: {
    type: Number,
    required: true,
  },

  prevOwner: {
    type: Number, //addr
  },

  newOwner: {
    type: Number, //addr
  },
  code: {
    type: Number,
  },
  note: {
    type: String,
  },
  price: {
    type: String,
  },
};
const history = mongoose.model("history", historySchema);
module.exports = history;
