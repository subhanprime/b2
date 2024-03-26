const express = require("express");
const {
  validateSubscription,
} = require("../middleware/subscription.middleware");
const { SubscriptionController } = require("../controllers");
const router = express.Router();

// Create a subscription
router.post("/", /*validateSubscription,*/ SubscriptionController.subscription);
// Retrieve subscriptions
router.post("/retrieve", SubscriptionController.getSubscriptions);

module.exports = router;
