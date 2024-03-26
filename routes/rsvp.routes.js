const express = require("express");
const { RsvpController } = require("../controllers");
const { validateRsvp } = require("../middleware/rsvp.middleware");

const router = express.Router();

// Add Rsvp
router.post("/", validateRsvp, RsvpController.rsvp);

module.exports = router;
