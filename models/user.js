const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    // role: {
    //   type: String,
    //   required: true,
    //   default: "NORMAL",
    // },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
