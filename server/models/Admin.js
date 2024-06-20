const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
}, {timestamps: true});

const AdminModel = mongoose.model("Admin", AdminSchema);

module.exports = AdminModel;
