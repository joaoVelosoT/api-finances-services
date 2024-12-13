const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaNotification = new Schema({
  _idClient: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  dateNotification: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", schemaNotification);

module.exports = Notification;
