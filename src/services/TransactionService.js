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
      // Adicionar o valor na conta
      const addValue = await AccountService.addValue(
        dataTransaction._idAccount,
        Number(dataTransaction.value)
      );
      if (addValue.error) {
        return addValue;
      }
      // Se adicionar o valor na conta sem erros, criar a transação
      const transaction = await Transaction.create(dataTransaction);

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
  getAll: async (query) => {
    try {
      const { details = false, page = 1 } = query;
      // Definindo o limite de cada requisicao
      const limit = 20;
      // Pegando a quantidade de transacoes feitas
      const countTransactions = await Transaction.countDocuments();
      // Criando variavel para manipular a ultima pagina disponiveç
      var lastPage = 1;

      if (countTransactions !== 0) {
        // Fazendo conta para saber a quantidade de paginas, e arredondando para cima
        lastPage = Math.ceil(countTransactions / limit);
      } else {
        return {
          code: 203,
          error: {
            message: "Transactions not founds",
          },
        };
      }

      const skip = page * limit - limit;
      const transactions = await Transaction.find().skip(skip).limit(limit);

      if (details !== "true") {
        return {
          code: 200,
          message: "All transactions",
          transactions: transactions,
        };
      }

      // Criando array para poder manipular os dados da transacao
      const transactionsDetails = [];

      // Fazendo um for, para pegar o idAccount de cada objeto, findar no db, e detalhar o objeto
      for (const transaction of transactions) {
        const account = await Account.findById(transaction._idAccount);
        if (!account) {
          return {
            code: 404,
            error: {
              message: "Account not found",
            },
          };
        }
        // Adicionando o objeto detalhado no array
        transactionsDetails.push({
          _id: transaction._id,
          typeAccount: transactions.typeAccount,
          typeTransaction: transaction.typeTransaction,
          value: transaction.value,
          dateTransaction: transaction.dateTransaction,
          account: {
            _id: account._id,
            _idClient: account._idClient,
            balance: account.balance,
          },
        });
      }

      return {
        code: 200,
        message: "All transactions details",
        transactions: transactionsDetails,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
};

module.exports = TransactionService;
