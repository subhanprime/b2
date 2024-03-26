const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const membershipSchema = new mongoose.Schema({
  firstName: {
    type: "String",
    require: false,
  },
  lastName: {
    type: "String",
    require: false,
  },
  phoneNo: {
    type: "String",
    require: false,
    unique: true,
    sparse: true,
  },
  email: {
    type: "string",
    require: false,
    unique: true,
    sparse: true,
  },
  primaryCity: {
    type: "String",
    require: false,
  },
  dob: {
    type: "String",
    require: false,
  },
  job: {
    type: "String",
    require: false,
  },
  industry: {
    type: "String",
    require: false,
  },
  salary: {
    type: "String",
    require: false,
  },
  gender: {
    type: "String",
    require: false,
  },
  // countryCode: {
  //   type: "String",
  //   require: false,
  // },
  about: {
    type: "String",
    require: false,
    default: "",
  },
  dateCreated: {
    type: "Date",
    require: false,
    default: Date.now,
  },
  applicationStep: {
    type: String,
    // enum: ApplicationStatus,
    default: "Step3",
  },
  expoToken: {
    type: [String],
    required: false,
  },
  membershipStatus: {
    type: String,
    // enum: MembershipStatus,
    default: "Pending",
  },
  membershipType: {
    type: String,
    // enum: MembershipType,
    default: "Standard",
  },
  instagram: {
    type: String,
    required: false,
  },
  instagramId: {
    type: String,
    required: false,
  },
  linkedin: {
    type: String,
    required: false,
  },
  linkedinImage: {
    type: String,
    required: false,
  },
  flag: {
    type: Boolean,
    required: false,
  },
  approvedDate: {
    type: Date,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  eventsNotif: {
    type: Boolean,
    required: false,
    default: false,
  },
  recomendationsNotif: {
    type: Boolean,
    required: false,
    default: false,
  },
  accessNotif: {
    type: Boolean,
    required: false,
    default: false,
  },
  paymentMethod: {
    type: {
      pid: { type: String, nullable: true },
      paymentType: { type: String, required: true, default: "applePay" },
    },
    required: false,
  },
  channel: {
    type: String,
    default: "Website",
  },
});

membershipSchema.plugin(mongoosePaginate);

const membership = mongoose.model("users", membershipSchema);

module.exports = membership;
