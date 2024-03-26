const { membershipService } = require("../services");
const HttpStatus = require("../constants/httpstatus");
const MESSAGES = require("../constants/messages");

// Creating Membership
const membership = async (req, res) => {
  try {
    console.log(`Post request Controller membership body`, req.body);
    const data = await membershipService.create(req.body);
    console.log(`membership Controller created data`, data);
    res.status(HttpStatus.OK).json({ message: MESSAGES.MEMBERSHIP_CREATED });
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

// Retrieving Memberships
const getMembership = async (req, res) => {
  try {
    console.log(`Get Controller membership`);
    const data = await membershipService.retrieve(req);
    console.log(`membership get`, "data", data);
    res.status(HttpStatus.OK).json(data);
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

module.exports = {
  membership,
  getMembership,
};
