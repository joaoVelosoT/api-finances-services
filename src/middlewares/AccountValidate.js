const isMongoID = require("../utils/ValidationsUtils");

const AccountValidate = async (req, res, next) => {
  try {
    var { _idClient, balance } = req.body;

    const isValidId = await isMongoID(_idClient);

    if (!isValidId.success) {
      return res.status(isValidId.error.code).json({
        code: isValidId.error.code,
        method: req.method,
        message: "Invalid account data",
        details: {
          cause: isValidId.error.details.cause,
        },
      });
    }

    if (!balance) {
      balance = 0.0;
    }

    req.account = {
      _idClient,
      balance,
    };

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        code: 500,
        method: req.method,
        message: "Error, while valide the account",
        details: {
          cause: error.message,
        },
      },
    });
  }
};

const AccountValidateID= async (req, res, next) => {
  try {
    const isValidId = await isMongoID(req.params.id);

    if (!isValidId.success) {
      return res.status(isValidId.error.code).json({
        code: isValidId.error.code,
        method: req.method,
        message: "Invalid account data",
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
        message: "Error, while valide the account",
        details: {
          cause: error.message,
        },
      },
    });
  }
};


module.exports = {AccountValidate,AccountValidateID}