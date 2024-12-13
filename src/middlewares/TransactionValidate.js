const isMongoID = require("../utils/ValidationsUtils");

const TransactionValidate = async (req, res, next) => {
  try {
    const { _idAccount, typeAccount, typeTransaction, value } = req.body;

    // Validando se enviaram o id da conta
    if (!_idAccount) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Invalid transaction data",
        details: {
          cause: "The idAccount is required",
        },
      });
    }
    // Validando se e um mongoId
    const isValidId = await isMongoID(_idAccount);
    console.log(isValidId);

    if (!isValidId.success) {
      return res.status(isValidId.error.code).json({
        code: isValidId.error.code,
        method: req.method,
        message: "Invalid transaction data",
        details: {
          cause: isValidId.error.details.cause,
        },
      });
    }

    const typesAccount = [
      "Corrente",
      "Poupança",
      "Salario",
      "Mista",
      "Digital",
      "Universitaria",
      "Conjunta",
      "Solidaria",
    ];

    if (!typeAccount) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Invalid transaction data",
        details: {
          cause: "The type account is required",
        },
      });
    }
    // Validando se o tipo da conta esta na lista de tipos validos
    // Revisar esse codigo
    if (!typesAccount.includes(typeAccount)) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Invalid transaction data",
        details: {
          cause: "typeAccount invalid",
        },
      });
    }

    // Validando se o tipo da transacao foi enviado
    if (!typeTransaction) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Invalid transaction data",
        details: {
          cause: "The type transaction is required",
        },
      });
    }

    // Validando se o tipo da transacao e valido

    const typesTransactions = ["PIX", "TED", "DOC"];
    if (!typesTransactions.includes(typeTransaction)) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Invalid transaction data",
        details: {
          cause: "The type transaction invalid",
        },
      });
    }

    // Validando se enviaram o valor
    if (!value) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Invalid transaction data",
        details: {
          cause: "The value is required",
        },
      });
    }

    req.transaction = {
      _idAccount,
      typeAccount,
      typeTransaction,
      value,
    };

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        code: 500,
        method: req.method,
        message: "Error, while valide the transaction",
        details: {
          cause: error.message,
        },
      },
    });
  }
};

const TransactionValidateID = async (req, res, next) => {
  try {
    const isValidId = await isMongoID(req.params.id);

    if (!isValidId.success) {
      return res.status(isValidId.error.code).json({
        code: isValidId.error.code,
        method: req.method,
        message: "Invalid transaction id",
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
        message: "Error, while valide the transactionId",
        details: {
          cause: error.message,
        },
      },
    });
  }
};

const TransactionValidateUpdate = async (req, res, next) => {
  try {
    const { _idAccount, typeAccount, typeTransaction, value } = req.body;

    if (_idAccount) {
      // Validando se e um mongoId
      const isValidId = await isMongoID(_idAccount);
      console.log(isValidId);

      if (!isValidId.success) {
        return res.status(isValidId.error.code).json({
          code: isValidId.error.code,
          method: req.method,
          message: "Invalid transaction data",
          details: {
            cause: isValidId.error.details.cause,
          },
        });
      }
    }

    if (typeAccount) {
      const typesAccount = [
        "Corrente",
        "Poupança",
        "Salario",
        "Mista",
        "Digital",
        "Universitaria",
        "Conjunta",
        "Solidaria",
      ];
      // Validando se o tipo da conta esta na lista de tipos validos
      // Revisar esse codigo
      if (!typesAccount.includes(typeAccount)) {
        return res.status(400).json({
          code: 400,
          method: req.method,
          message: "Invalid transaction data",
          details: {
            cause: "typeAccount invalid",
          },
        });
      }
    }
    if (typeTransaction) {
      const typesTransactions = ["PIX", "TED", "DOC"];
      if (!typesTransactions.includes(typeTransaction)) {
        return res.status(400).json({
          code: 400,
          method: req.method,
          message: "Invalid transaction data",
          details: {
            cause: "The type transaction invalid",
          },
        });
      }
    }

    req.transaction = {
      _idAccount,
      typeAccount,
      typeTransaction,
      value,
    };

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        code: 500,
        method: req.method,
        message: "Error, while valide the transactionUpdate",
        details: {
          cause: error.message,
        },
      },
    });
  }
};

module.exports = {
  TransactionValidate,
  TransactionValidateID,
  TransactionValidateUpdate,
};
