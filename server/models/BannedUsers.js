const mongoose = require("mongoose");

const BannedUsersSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Types.ObjectId, required: true },
    reason: { type: String, required: true },
    message: { type: String },
  },
  { timestamps: true }
);

const BannedUsersModel = mongoose.model("BannedUsers", BannedUsersSchema);

module.exports = BannedUsersModel;
