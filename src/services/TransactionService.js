const Account = require("../models/Account");
const Transaction = require("../models/Transactions");
const AccountService = require("./AccountService");

const TransactionService = {
  create: async (dataTransaction) => {
    try {
      // Validar se a conta existe
      const accountExist = await Account.findById(dataTransaction._idAccount);
      if (!accountExist) {
        return {
          code: 400,
          error: {
            message: "Account not found",
          },
        };
      }

      const transaction = await Transaction.create(dataTransaction);
      const addValue = await AccountService.addValue(
        dataTransaction._idAccount,
        Number(dataTransaction.value)
      );

      if (addValue.error) {
        return addValue;
      }

      return {
        code: 201,
        message: "Transaction created",
        transaction,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
};

module.exports = TransactionService;
