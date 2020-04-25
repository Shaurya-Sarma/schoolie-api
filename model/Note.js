const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let Note = new Schema(
  {
    name: {
      type: String,
    },
    data: {
      type: String,
    },
    tags: {
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
    collection: "notes",
  }
);

module.exports = mongoose.model("Note", Note);
