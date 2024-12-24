const authController = require("../controllers/authController");

const router = require("express").Router();
const { verifyToken } = require("../controllers/verifyToken");

router.post("/register", authController.registerUser);

router.post("/refresh", authController.requestRefreshToken);

router.post("/login", authController.loginUser);
router.post("/logout", verifyToken,authController.logOut);
module.exports = router;