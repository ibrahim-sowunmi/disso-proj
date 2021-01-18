const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  loginDates: [Date],
  noOfComments: {
    type: Number,
    default: 0,
  },
  cardsViewedByDate: {
    type: Object,
    default: {},
  },
});

module.exports = User = mongoose.model("user", UserSchema);
