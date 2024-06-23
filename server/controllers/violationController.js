const BannedUsersModel = require("../models/BannedUsers");
const ProfileModel = require("../models/Profile");

module.exports.setViolation = async (req, res) => {
  const { userID, popupAction, message, reason } = req.body;
  const user = await ProfileModel.findOne(
    { _id: userID },
    { _id: 0, violations: 1 }
  );
  const violation = user.violations;

  let newViolation = {
    warn: false,
    warnings: 0,
    ban: false,
    violationMessage: message,
    lastWarned: "",
  };

  if (popupAction == "ban") {
    newViolation.ban = true;
    const bannedUser = new BannedUsersModel({
      userID,
      reason,
      message,
    });
    bannedUser.save();
  } else {
    newViolation.warn = true;
    newViolation.warnings = violation ? violation.warnings + 1 : 1;
    newViolation = { ...newViolation, lastWarned: Date.now() };
  }

  await ProfileModel.updateOne({ _id: userID }, { violations: newViolation });

  res.status(200).json({ message: `User successfully ${popupAction}ed` });
};
