const { AppError } = require("../Errors");
const HttpStatus = require("../constants/httpstatus");
const MESSAGES = require("../constants/messages");
const { RsvpRepository } = require("../repositories/rsvp.repository");

// RSVP service
const addRsvp = async (body) => {
  try {
    // const networkData = await axios.get("https://ipinfo.io");
    // const ip = networkData.data.ip;
    // body.ip = ip;
    const data = await RsvpRepository.addRsvp(body);
    console.log("RSVP ADDED : ", data);
    return data;
  } catch (err) {
    console.log("Error Service Create RSVP", err);
    throw new AppError(
      HttpStatus.SERVERERROR,
      MESSAGES.INTERNAL_SERVER_ERROR,
      true
    );
  }
};

module.exports = {
  addRsvp,
};
