const mongoose = require("mongoose");

const userSchemar = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("user", userSchemar);
