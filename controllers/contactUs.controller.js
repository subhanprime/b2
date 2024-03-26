const { contactUsService } = require("../services");
const HttpStatus = require("../constants/httpstatus");
const MESSAGES = require("../constants/messages");

// Add Contact Us Information to DB
const contactUs = async (req, res) => {
  try {
    console.log(`Post request Controller Contact us body`, req.body);
    const data = await contactUsService.create(req.body);
    console.log("Create Controller Contact us data", data);
    res.status(HttpStatus.OK).json({ message: MESSAGES.CONTACT_US });
  } catch (error) {
    console.log("Error Controller Contact us ", error);
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

// Retrieve Contact Information from DB
const getContacts = async (req, res) => {
  try {
    console.log(`Get Controller Contact us`);
    const data = await contactUsService.getContacts(req);
    console.log(`Contact us get`, "data", data);
    res.status(HttpStatus.OK).json(data);
  } catch (error) {
    console.log("Error Controller Contact us ", error);
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
  contactUs,
  getContacts,
};
