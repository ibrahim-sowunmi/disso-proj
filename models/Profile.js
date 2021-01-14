const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  student: {
    type: String,
    required: true,
  },
  // TODO - modules should be required. Current cannot get input to work.
  modules: {
    type: [String],
  },
  bio: {
    type: String,
  },
  contactable: {
    type: String,
    default: "true"
  },
  rank: {
    type: String,
    default: "0"
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
