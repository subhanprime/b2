const express = require("express");
const router = express.Router();
const { ContactUsController } = require("../controllers");
const { validateContactUs } = require("../middleware/contactUs.middleware");

// Save Contact Information
router.post("/" /*, validateContactUs,*/, ContactUsController.contactUs);

// Retrieve Contact Information
router.post("/retrieve", ContactUsController.getContacts);

module.exports = router;
