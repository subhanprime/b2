const HttpStatus = require("../constants/httpstatus");
const rsvpValidationSchema = require("../validators/rsvp.validator");

// Validation for ContactUs
const validateRsvp = (req, res, next) => {
  const { error } = rsvpValidationSchema.validate(req.body);

  if (error) {
    return res.status(HttpStatus.BADREQUEST).send(error.message);
  }
  next();
};

module.exports = {
  validateRsvp,
};
