const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaAccount = new Schema({
  _idClient: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", schemaAccount);

module.exports = Account;
