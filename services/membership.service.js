const { AppError } = require("../Errors");
const HttpStatus = require("../constants/httpstatus");
const moment = require("moment");
const {
  MemberhsipRepository,
} = require("../repositories/membership.repository");
const MESSAGES = require("../constants/messages");

// Creating Memberhsips
const create = async (body) => {
  try {
    // Formatting dob
    // const dob = moment(body.dob, "DD-MM-YYYY");
    // let today = moment(new Date(), "DD-MM-YYYY");

    // Disabling future dates for DOB
    // if (dob.isAfter(today)) {
    //   throw new Error("Invalid Date of birth");
    // }
    const data = await MemberhsipRepository.createMembership(body);
    console.log("Create Service Membership data", data);
    return data;
  } catch (err) {
    console.log("Error Service Create Membership", err);
    throw new AppError(
      HttpStatus.SERVERERROR,
      MESSAGES.INTERNAL_SERVER_ERROR,
      true
    );
  }
};

// Retrieve all Memberships
const retrieve = async (req) => {
  try {
    const { pageNumber, pageLimit, sortBy, sort } = req.body;
    const sorting = { asc: 1, desc: -1 };
    const data = await MemberhsipRepository.paginateMemberships(
      pageNumber,
      pageLimit,
      sort,
      sortBy,
      sorting
    );
    console.log("Get Service Membership data", data);
    return data;
  } catch (err) {
    console.log("Error Service Get Membership", err);
    throw new AppError(
      HttpStatus.SERVERERROR,
      MESSAGES.INTERNAL_SERVER_ERROR,
      true
    );
  }
};

module.exports = {
  create,
  retrieve,
};
