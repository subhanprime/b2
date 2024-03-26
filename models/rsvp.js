const mongoose = require("mongoose");

const rsvpSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  // plusOne: {
  //   type: Boolean,
  //   required: false,
  // },
  instagram: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  ip: {
    type: String,
    required: false,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});
const Rsvp = mongoose.model("rsvp", rsvpSchema);

module.exports = Rsvp;
