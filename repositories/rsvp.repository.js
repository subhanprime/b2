const { RSVP } = require("../models");

var RsvpRepository = {
  // Add rsvp
  addRsvp: (body) => RSVP.create(body),
};

module.exports = {
  RsvpRepository,
};
