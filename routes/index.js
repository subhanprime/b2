const express = require("express");
const router = express.Router();

// Getting Base Router Names
const {
  userBaseRoute,
  membershipBaseRoute,
  contactUsBaseRoute,
  SubscriptionBaseRoute,
} = require("../constants/routes");

// Getting Routers
const UserRouter = require("./user.routes");
const authRouter = require("./auth.routes");
const imageUpload = require("./imageUpload.routes");
const membership = require("./membership.routes");
const contactUs = require("./contactUs.routes");
const subscription = require("./subscribe.routes");
const rsvp = require("./rsvp.routes");

// Defining Routers
// User router
router.use(userBaseRoute, UserRouter);
router.use("/", authRouter);
router.use("/", imageUpload);
// Membership router
router.use(membershipBaseRoute, membership);
// Contact Us Router
router.use(contactUsBaseRoute, contactUs);
// Subscription Router
router.use(SubscriptionBaseRoute, subscription);

// rsvp router
router.use("/rsvp", rsvp);
module.exports = router;
