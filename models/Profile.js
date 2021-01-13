const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  student: {
    type: Boolean,
    required: true,
  },
  modules: {
    type: [String],
    require: true
  },
  contactable: {
    type: Boolean,
    default: true
  },
  bio: {
    type: String,
  },
  staffcode: {
    type: String,
  },
  year: {
    type: Number,
    default: 0
  },
  rank: {
    type: Number,
    default: 0
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
