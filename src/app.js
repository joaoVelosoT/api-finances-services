const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

if (!PORT) {
  return console.error({
    code: 400,
    error: {
      message: "Error, port not found ",
    },
  });
}
const router = require("./routes/router");
const connectDB = require("./config/config");
app.use(express.json());
app.use("/", router);

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log("-------------------------------------------");
    console.log("Server running");
    console.log("-------------------------------------------");
  } catch (error) {
    console.log("Err, not connected database");
    console.log(error);
  }
});
