const { AppError } = require("../Errors");
const HttpStatus = require("../constants/httpstatus");
const MESSAGES = require("../constants/messages");
const {} = require("../repositories/contactUs.repository");
const {
  SubscriptionRepository,
} = require("../repositories/subscription.repository");

// Create a subscription
const create = async (body) => {
  try {
    const data = await SubscriptionRepository.createSubscription(body);
    console.log("Create Service subscription", data);
    return data;
  } catch (err) {
    console.log("Error Service Create subscription", err);
    throw new AppError(
      HttpStatus.SERVERERROR,
      MESSAGES.INTERNAL_SERVER_ERROR,
      true
    );
  }
};

// Retrieve All Subscriptions
const retrieve = async (req) => {
  try {
    const { pageNumber, pageLimit, sortBy, sort } = req.body;
    const sorting = { asc: 1, desc: -1 };
    const data = await SubscriptionRepository.paginateSubscriptions(
      pageNumber,
      pageLimit,
      sort,
      sortBy,
      sorting
    );
    // const data = await SubscriptionRepository.retrieveSubscription();
    console.log("Get Service subscription", data);
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
  retrieve,
};
