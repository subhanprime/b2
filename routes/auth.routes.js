const express = require("express");
const { AuthController } = require("../controllers");
const Validator = require("../middleware/validator");
const { extractTokenMiddleware } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/login", Validator("login"), AuthController.login);
router.post("/token", AuthController.regenerateAccesstoken);
router.post("/googleAuth/register", AuthController.register);
router.post("/googleAuth/verify", AuthController.verify);
router.post("/googleAuth/validate", AuthController.validate);
router.post("/logout", extractTokenMiddleware, AuthController.logout);
router.post("/forgetpass", AuthController.forgotPassword);
router.post("/resetpass", AuthController.resetPassword);

module.exports = router;
