const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const subscriptionSchema = new mongoose.Schema({
  email: {
    type: "string",
    require: false,
    // unique: false,
  },
  dateCreated: {
    type: "Date",
    require: false,
    default: Date.now,
  },
});

subscriptionSchema.plugin(mongoosePaginate);

const Subscription = mongoose.model("subscriptions", subscriptionSchema);

module.exports = Subscription;
