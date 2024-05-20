const ProfileModel = require("../models/Profile");

module.exports.userData = async (req, res) => {
  const users = await ProfileModel.find({},{name:1, bio:1, breed:1, });

  return res.json({users})
};
