const Joi = require("joi");
const HttpStatus = require("../constants/httpstatus");
const contactUsSchema = require("../validators/contactUs.validator");

// Validation for ContactUs
const validateContactUs = (req, res, next) => {
  const { error } = contactUsSchema.validate(req.body);

  if (error) {
    return res.status(HttpStatus.BADREQUEST).send(error);
  }
  next();
};

module.exports = {
  validateContactUs,
};
