const Joi = require("joi");

const rsvpValidationSchema = Joi.object({
  firstName: Joi.string().max(50).required().messages({
    "string.max": "First name cannot be longer than 50 characters",
  }),
  lastName: Joi.string().max(50).required().messages({
    "string.max": "Last name cannot be longer than 50 characters",
  }),
  instagram: Joi.string().required(),
  email: Joi.string()
    .email()
    .required()
    .messages({ "string.email": "Please enter a valid email address" }),
}).messages({
  "any.required":
    "Please enter all required fields. First name, last name, instagram handle and email",
});

module.exports = rsvpValidationSchema;
