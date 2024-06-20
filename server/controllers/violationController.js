const ProfileModel = require("../models/Profile");

module.exports.setViolation = async (req, res) => {
  const { userID, popupAction, message } = req.body;
  const user = await ProfileModel.findOne(
    { _id: userID },
    { _id: 0, violations: 1 }
  );
  const violation = user.violations;

  const newViolation = {
    warn: false,
    warnings: 0,
    ban: false,
    violationMessage: message,
  };

  if (popupAction == "ban") {
    newViolation.ban = true;
  } else {
    newViolation.warn = true;
    newViolation.warnings = violation ? violation.warnings + 1 : 1;
  }

  await ProfileModel.updateOne({ _id: userID }, { violations: newViolation });

  res.status(200).json({ message: `User successfully ${popupAction}ed` });
};
