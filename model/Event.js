const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let Event = new Schema(
  {
    name: {
      type: String,
    },
    location: {
      type: String,
    },
    date: {
      type: Date,
    },
    time: {
      type: Date,
    },
    userId: {
      type: String,
    },
  },
  {
    collection: "events",
  }
);

module.exports = mongoose.model("Event", Event);
