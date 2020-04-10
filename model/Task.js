const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let Task = new Schema(
  {
    name: {
      type: String,
    },
    subject: {
      type: String,
    },
    completed: {
      type: Boolean,
    },
    date: {
      type: Date,
    },
    userId: {
      type: String,
    },
  },
  {
    collection: "tasks",
  }
);

module.exports = mongoose.model("Task", Task);
