const { SUBSCRIPTION } = require("../models");

var SubscriptionRepository = {
  // create contacts
  createSubscription: (body) => SUBSCRIPTION.create(body),

  // retrieve subscriptions
  retrieveSubscription: () => SUBSCRIPTION.find({}),

  // Retrieve subscriptions pagiated
  paginateSubscriptions: (pageNumber, pageLimit, sort, sortBy, sorting) =>
    SUBSCRIPTION.paginate(
      {},
      { page: pageNumber, limit: pageLimit, sort: { [sortBy]: sorting[sort] } }
    ),
};

module.exports = {
  SubscriptionRepository,
};
