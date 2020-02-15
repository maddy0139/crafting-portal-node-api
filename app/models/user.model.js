const mongoose = require("mongoose");
const UserScehma = mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    permissionLevel: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserScehma);
