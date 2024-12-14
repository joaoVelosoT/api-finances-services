require("dotenv").config();
const Adm = require("../models/Adm");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AdmService = {
  create: async (dataAdm) => {
    try {
      const emailExist = await Adm.findOne({ email: dataAdm.email });
      if (emailExist) {
        return {
          code: 400,
          error: {
            message: "Email already exists",
          },
        };
      }

      const passwordCript = await bcrypt.hash(dataAdm.password, 12);
      dataAdm.password = passwordCript;
      const adm = await Adm.create(dataAdm);

      const token = await jwt.sign(
        {
          _id: adm._id,
          email: adm.email,
        },
        process.env.SECRET
      );

      return {
        code: 201,
        message: "Adm created",
        adm: adm,
        token: token,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
};


module.exports = AdmService