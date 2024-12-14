const { isEmail, isAge } = require("../utils/ValidationsUtils");

const AdmValidate = async (req, res, next) => {
  try {
    const { name, email, age, password } = req.body;
    // Validando o nome
    if (!name) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Error, while valide the ADM",
        details: {
          cause: "The name is required",
        },
      });
    }
    // Validando a idade
    if (!age) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Error, while valide the ADM",
        details: {
          cause: "The age is required",
        },
      });
    }
    const isAgeValid = await isAge(age);
    if (!isAgeValid) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Error, while valide the ADM",
        details: {
          cause: "The age not valid",
        },
      });
    }

    // Validando o email
    if (!email) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Error, while valide the ADM",
        details: {
          cause: "The email is required",
        },
      });
    }
    const isEmailValid = await isEmail(email);
    if (!isEmailValid) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Error, while valide the ADM",
        details: {
          cause: "The email not valid",
        },
      });
    }

    if (!password) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Error, while valide the ADM",
        details: {
          cause: "The password is required",
        },
      });
    }

    req.adm = {
      name,
      email,
      age,
      password,
    };

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        code: 500,
        method: req.method,
        message: "Error, while valide the adm",
        details: {
          cause: error.message,
        },
      },
    });
  }
};

const AdmValidateID = async (req, res, next) => {
  try {
    const isValidId = await isMongoID(req.params.id);

    if (!isValidId.success) {
      return res.status(isValidId.error.code).json({
        code: isValidId.error.code,
        method: req.method,
        message: "Invalid adm data",
        details: {
          cause: isValidId.error.details.cause,
        },
      });
    }

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        code: 500,
        method: req.method,
        message: "Error, while valide the adm",
        details: {
          cause: error.message,
        },
      },
    });
  }
};

module.exports = { AdmValidate, AdmValidateID };
