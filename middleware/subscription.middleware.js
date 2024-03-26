const HttpStatus = require("../constants/httpstatus");
const subscriptionSchema = require("../validators/subscription.validator");

// Validation for Subscription
const validateSubscription = (req, res, next) => {
  const { error } = subscriptionSchema.validate(req.body);

  if (error) {
    return res.status(HttpStatus.BADREQUEST).send(error);
  }
  next();
};

module.exports = {
  validateSubscription,
};
