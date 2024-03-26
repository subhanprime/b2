const { CONTACTUS } = require("../models");

var ContactUsRepository = {
  // create contacts
  createContacts: (body) => CONTACTUS.create(body),

  // Retrieve contacts
  getContacts: () => CONTACTUS.find({}),

  // Retrieve contacts paginated
  paginateContacts: (pageNumber, pageLimit, sort, sortBy, sorting) =>
    CONTACTUS.paginate(
      {},
      { page: pageNumber, limit: pageLimit, sort: { [sortBy]: sorting[sort] } }
    ),
};

module.exports = {
  ContactUsRepository,
};
