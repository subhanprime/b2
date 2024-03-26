const { AppError } = require("../Errors");
const HttpStatus = require("../constants/httpstatus");
const MESSAGES = require("../constants/messages");
const { ContactUsRepository } = require("../repositories/contactUs.repository");

// Add Contacts to DB
const create = async (body) => {
  try {
    const data = await ContactUsRepository.createContacts(body);
    console.log("Create Service subscription Create", data);
    return data;
  } catch (err) {
    console.log("Error Create Service subscription", err);
    throw new AppError(
      HttpStatus.SERVERERROR,
      MESSAGES.INTERNAL_SERVER_ERROR,
      true
    );
  }
};

// Retrieve all Contacts from DB
const getContacts = async (req) => {
  try {
    const { pageNumber, pageLimit, sortBy, sort } = req.body;
    const sorting = { asc: 1, desc: -1 };
    const data = await ContactUsRepository.paginateContacts(
      pageNumber,
      pageLimit,
      sort,
      sortBy,
      sorting
    );
    console.log("Get Service subscription Get", data);
    return data;
  } catch (err) {
    console.log("Error Service Get subscription", err);
    throw new AppError(
      HttpStatus.SERVERERROR,
      MESSAGES.INTERNAL_SERVER_ERROR,
      true
    );
  }
};

module.exports = {
  create,
  getContacts,
};
