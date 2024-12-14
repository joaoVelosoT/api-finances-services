const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaAdm = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Adm = mongoose.model("Adm", schemaAdm);

module.exports = Adm;
