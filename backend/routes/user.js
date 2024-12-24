const userController = require("../controllers/userController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndUserAuthorization,
} = require("../controllers/verifyToken");

const router = require("express").Router();

router.get("/", verifyToken, userController.getAllUsers);
router.get("/myaccount", verifyToken, userController.getUser);
router.patch("/withdraw",  verifyToken,userController.updateUser);
router.delete("/:id", verifyTokenAndUserAuthorization, userController.deleteUser);

module.exports = router;