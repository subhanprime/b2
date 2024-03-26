const Joi = require("joi").extend(require("@joi/date"));

// Validation for Subscriptions
const subscriptionSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = subscriptionSchema;
