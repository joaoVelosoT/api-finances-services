const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaTransaction = new Schema({
  _idAccount: {
    type: String,
    required: true,
  },
  typeAccount: {
    type: String,
    required: true,
  },
  typeTransaction: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  dateTransaction: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", schemaTransaction);

module.exports = Transaction;
