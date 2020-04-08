const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema
let Student = new Schema(
  {
    userName: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    }
  },
  {
    collection: "students"
  }
);

module.exports = mongoose.model("Student", Student);
