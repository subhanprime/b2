const { MEMBERSHIP } = require("../models");

var MemberhsipRepository = {
  // create memberships
  createMembership: (body) => MEMBERSHIP.create(body),
  // Retrieve memberships
  getMembership: () => MEMBERSHIP.find({}),
  // Retrieve memberships pagiated
  paginateMemberships: (pageNumber, pageLimit, sort, sortBy, sorting) =>
    MEMBERSHIP.paginate(
      {},
      { page: pageNumber, limit: pageLimit, sort: { [sortBy]: sorting[sort] } }
    ),
  findByQuery: (query) => MEMBERSHIP.find(query),
};

module.exports = {
  MemberhsipRepository,
};
