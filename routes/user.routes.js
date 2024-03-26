const express = require("express");

const router = express.Router();
const { UserController } = require("../controllers");
const Validator = require("../middleware/validator");
// const { authenticateJWT } = require('../middleware/auth.middleware');

router.get("/findAll", UserController.findAll);
router.post("/create", UserController.create);
router.post("/update/:userId", UserController.update);
router.post("/delete/:userId", UserController.purge);
router.post("/changeUserPassword", UserController.changeUserPassword);

// to use the jwtauth middleware use the router as below
// router.get('/findAll', authenticateJWT, UserController.findAll);

module.exports = router;

/**
 * .env
 * REST Ful routes
 * Exception Handling
 * Status codes -> correction
 */
