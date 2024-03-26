const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const contactUsSchema = new mongoose.Schema({
  fullName: {
    type: "String",
    require: false,
  },

  contact: {
    type: "string",
    require: false,
    // unique: false,
  },
  enquiry: {
    type: "String",
    require: false,
  },

  dateCreated: {
    type: "Date",
    require: false,
    default: Date.now,
  },
});

contactUsSchema.plugin(mongoosePaginate);

const ContactUs = mongoose.model("contactus", contactUsSchema);

module.exports = ContactUs;
