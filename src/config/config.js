const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/finances-services");
    console.log("Database connected successfully !");
  } catch (error) {
    console.error(error);
  }
};



module.exports = connectDB;