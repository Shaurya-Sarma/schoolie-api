const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let Holiday = new Schema(
  {
    name: {
      type: String,
    },
    date: {
      type: Date,
    },
    userId: {
      type: String,
    },
  },
  {
    collection: "holidays",
  }
);

module.exports = mongoose.model("Holiday", Holiday);
