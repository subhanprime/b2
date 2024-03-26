const { subscriptionService } = require("../services");
const HttpStatus = require("../constants/httpstatus");
const MESSAGES = require("../constants/messages");

// Creating new Subscription
const subscription = async (req, res) => {
  try {
    console.log(`Post request Controller subscription`, req.body);
    const data = await subscriptionService.create(req.body);
    console.log("Create Service subscription", data);
    res.status(HttpStatus.OK).json({ message: MESSAGES.SUBSCRIPTION_CREATED });
  } catch (error) {
    console.log("Error Controller Membership", error);
    if (error?.isOperational) {
      res.status(error.httpCode).json({
        message: error.description,
      });
    } else {
      res.status(HttpStatus.SERVERERROR).json({
        error: error.message,
      });
    }
  }
};

// Retrieving Subscription
const getSubscriptions = async (req, res) => {
  try {
    console.log(`Get Controller subscription`);
    const data = await subscriptionService.retrieve(req);
    console.log(`subscription get`, "data", data);
    res.status(HttpStatus.OK).json(data);
  } catch (error) {
    console.log("Error Controller subscription", error);
    if (error?.isOperational) {
      res.status(error.httpCode).json({
        message: error.description,
      });
    } else {
      res.status(HttpStatus.SERVERERROR).json({
        error: error.message,
      });
    }
  }
};

module.exports = {
  subscription,
  getSubscriptions,
};
