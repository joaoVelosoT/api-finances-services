const isMongoID = require("../utils/ValidationsUtils");

const AccountValidate = async (req, res, next) => {
  try {
    var { _idClient, balance } = req.body;

    if (req.method === "UPDATE" || req.method === "PUT") {
      if (_idClient) {
        const isValidId = await isMongoID(_idClient);
      }
      if (!_idClient && !balance) {
        return res.status(400).json({
          code: 400,
          method: req.method,
          message: "Invalid account data",
          details: {
            cause: "No data was sent to update",
          },
        });
      }
    }

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

const AccountValidateID = async (req, res, next) => {
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

const AccountValidateUpdate = async (req, res, next) => {
  try {
    const { _idClient, balance } = req.body;

    if (_idClient) {
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
    }

    // Validando se o usuario enviou pelo menos algum dado para atualizar
    if (!_idClient && !balance) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Invalid account data",
        details: {
          cause: "No data was sent to update",
        },
      });
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

module.exports = { AccountValidate, AccountValidateID, AccountValidateUpdate };
