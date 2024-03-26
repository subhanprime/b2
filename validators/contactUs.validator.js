const Joi = require("joi").extend(require("@joi/date"));

// Validation for Contact Us
const contactUsSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  contact: Joi.string().email().required(),
  enquiry: Joi.string().required(),
});

module.exports = contactUsSchema;
