const router = require("express").Router();
const { Login, logout } = require("../controllers/authController");
const { userData } = require("../controllers/userController");
const { setViolation } = require("../controllers/violationController");
const { userVerification } = require("../middleware/authMiddleware");

router.get("/user-data", userVerification, userData);
router.post("/login", Login);
router.get("/logout", logout);

router.post("/violation",setViolation);

module.exports = router;
