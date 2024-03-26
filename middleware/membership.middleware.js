const HttpStatus = require("../constants/httpstatus");
const {
  MemberhsipRepository,
} = require("../repositories/membership.repository");
const membershipSchema = require("../validators/membership.validator");

// Validation for Membership
const validateMembership = (req, res, next) => {
  const { error } = membershipSchema.validate(req.body);

  if (error) {
    console.log(error.message);
    return res.status(HttpStatus.BADREQUEST).send({ message: error.message });
  }
  next();
};

// Unique phoneNo and Email Verification
const uniqueUserValidation = async (req, res, next) => {
  const { phoneNo, email } = req.body;

  const userPhoneNo = await MemberhsipRepository.findByQuery({ phoneNo });

  const userEmail = await MemberhsipRepository.findByQuery({ email });

  console.log("User phone No: ", userPhoneNo.length);
  console.log("User Email: ", userEmail);

  if (userPhoneNo.length > 0) {
    return res
      .status(HttpStatus.BADREQUEST)
      .send({ message: "User with this phone number already exists" });
  }

  if (userEmail.length > 0) {
    return res
      .status(HttpStatus.BADREQUEST)
      .send({ message: "User with this email already exists" });
  }

  next();
};

module.exports = {
  validateMembership,
  uniqueUserValidation,
};
