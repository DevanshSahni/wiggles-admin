const router = require("express").Router();
const { userData } = require("../controllers/userController");

router.get("/user-data", userData);

module.exports = router;
