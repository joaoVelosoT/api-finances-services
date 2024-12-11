const isMongoID = require("../utils/ValidationsUtils");

const TransactionValidate = async (req, res, next) => {
  const { _idAccount, typeAccount, typeTransaction, value } = req.body;

  // Validando se enviaram o id da conta
  const isValidId = await isMongoID(_idAccount);
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
    return {
      code: 400,
      method: req.method,
      message: "Invalid transaction data",
      details: {
        cause: "The type transaction is required",
      },
    };
  }
  // Validando se o tipo da conta esta na lista de tipos validos
  // Revisar esse codigo
  if (!typesAccount.includes(typeAccount)) {
    return {
      code: 400,
      method: req.method,
      message: "Invalid transaction data",
      details: {
        cause: "The typeAccount invalid",
      },
    };
  }

  const typesTransactions = ["PIX", "TED", "DOC"];
  if (!typesTransactions.includes(typeTransaction)) {
    return {
      code: 400,
      method: req.method,
      message: "Invalid transaction data",
      details: {
        cause: "The type transaction invalid",
      },
    };
  }

  if (!value) {
    return {
      code: 400,
      method: req.method,
      message: "Invalid transaction data",
      details: {
        cause: "The value is required",
      },
    };
  }


  return next();
};
