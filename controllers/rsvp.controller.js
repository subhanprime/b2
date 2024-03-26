const HttpStatus = require("../constants/httpstatus");
const MESSAGES = require("../constants/messages");
const { rsvpService, addRsvp } = require("../services/rsvp.service");

// Add RSVP to database
const rsvp = async (req, res) => {
  try {
    console.log(`Post request Controller rsvp body`, req.body);
    const ip = req.ip;
    req.body.ip = ip;
    const data = await addRsvp(req.body);
    console.log("rsvp data", data);
    res.status(HttpStatus.OK).json({ message: "Recorded RSVP successfully" });
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
  rsvp,
};
