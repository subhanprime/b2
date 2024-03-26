const Joi = require("joi").extend(require("@joi/date"));

// Validaiton for Membeship
const membershipSchema = Joi.object({
  firstName: Joi.string()
    .max(50)
    .required()
    .pattern(/^[A-Za-z]+$/, { name: "customPattern", invert: false })
    .messages({
      "string.pattern.name": "First Name should contain only alphabets",
    }),
  lastName: Joi.string()
    .max(50)
    .required()
    .pattern(/^[A-Za-z]+$/, { name: "customPattern", invert: false })
    .messages({
      "string.pattern.name": "Last Name should should contain only alphabets",
    }),
  phoneNo: Joi.string()
    .regex(
      // eslint-disable-next-line @typescript-eslint/comma-dangle
      /^\+\d{1,4}\d{6,14}$/
    )
    .min(12)
    .max(15)
    .messages({
      "string.pattern.name": "Invalid phone number",
      "string.pattern.base": "Invalid phone number format",
    }),
  email: Joi.string().email().required(),
  primaryCity: Joi.string().required(),
  dob: Joi.date().format("MM/DD/YYYY").required(),
  job: Joi.string().required(),
  industry: Joi.string().required(),
  salary: Joi.string().required(),
  gender: Joi.string()
    .valid("Male", "Female", "Prefer not to say", "Other")
    .required(),
  // countryCode: Joi.string().required(),
  // social: Joi.string(),
  about: Joi.string(),
});

module.exports = membershipSchema;
