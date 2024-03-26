const express = require("express");
const router = express.Router();
const { MembershipController } = require("../controllers");
const {
  validateMembership,
  uniqueUserValidation,
} = require("../middleware/membership.middleware");

// Create Membership
router.post(
  "/",
  validateMembership,
  uniqueUserValidation,
  MembershipController.membership
);

// Retrieve Memberships
router.post("/retrieve", MembershipController.getMembership);

module.exports = router;
