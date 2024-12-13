const Account = require("../models/Account");
const Client = require("../models/Client");
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
      const addOrRemoveValue = await AccountService.addOrRemoveValue(
        dataTransaction._idAccount,
        Number(dataTransaction.value)
      );
      if (addOrRemoveValue.error) {
        return addOrRemoveValue;
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
  getOne: async (_idTransactions, query) => {
    try {
      const { details = false } = query;

      // Procurando a transacão
      const transaction = await Transaction.findById(_idTransactions);
      if (!transaction) {
        return {
          code: 404,
          error: {
            message: "Transaction not found",
          },
        };
      }
      // Validando se a requisição quer detalhes
      if (details !== "true") {
        return {
          code: 200,
          message: "Transaction find",
          transaction: transaction,
        };
      }

      // Pegando os dados da conta para fazer a detalhação
      const account = await Account.findById(transaction._idAccount);
      if (!account) {
        return {
          code: 404,
          error: {
            message: "Account not found",
          },
        };
      }
      // Pegando os dados do cliente para fazer a detalhação
      const client = await Client.findById(account._idClient);
      if (!client) {
        return {
          code: 404,
          error: {
            message: "Client not found",
          },
        };
      }

      // Retornando com o objeto detalhado
      return {
        code: 200,
        message: "Find transations",
        transaction: {
          _id: transaction._id,
          typeAccount: transaction.typeAccount,
          typeTransaction: transaction.typeTransaction,
          value: transaction.value,
          dateTransaction: transaction.dateTransaction,
          account: {
            _id: account._id,
            // _idClient: account._idClient,
            balance: account.balance,
            client: {
              _id: client._id,
              name: client.name,
              email: client.email,
            },
          },
        },
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  update: async (_idTransaction, dataTransaction) => {
    const { value = 0 } = dataTransaction;
    // Validando se existe a transacao enviada
    const transaction = await Transaction.findById(_idTransaction);
    if (!transaction) {
      return {
        code: 404,
        error: {
          message: "Transaction not found",
        },
      };
    }

    // Validando se existe a conta
    const account = await Account.findById(transaction._idAccount);
    if (!account) {
      return {
        code: 404,
        error: {
          message: "Account not found",
        },
      };
    }

    // Fazer a atualizacão do saldo da transferencia
    console.log(transaction);
    // Se tiver a o dado para atualizar o saldo, atualizar
    if (value) {
      console.log("remover saldo antigo");
      console.log(transaction.value);

      // Removendo o valor antigo
      const removeValue = await AccountService.addOrRemoveValue(
        account._id,
        -transaction.value
      );
      if (removeValue.error) {
        return removeValue;
      }

      // Adicionando o valor novo
      const addValue = await AccountService.addOrRemoveValue(
        account._id,
        value
      );

      if (addValue.error) {
        return addValue;
      }

      // Remover o saldo antigo
      // const addValue = await AccountService.addOrRemoveValue(account._id, value);

      // if (addValue.error) {
      //   return addValue;
      // }
    }
    await transaction.updateOne(dataTransaction);
    return {
      code: 200,
      message: "Transaction updated",
      transaction: transaction,
    };
  },
  getByAccount: async (_idAccount) => {
    try {
      const account = await Account.findById(_idAccount);
      if (!account) {
        return {
          code: 404,
          error: {
            message: "Account not found",
          },
        };
      }

      const transactions = await Transaction.find({ _idAccount: _idAccount });

      return {
        code: 200,
        message: "All transactions by client",
        transactions: transactions,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  delete: async (_idTransaction) => {
    try {
      const transaction = await Transaction.findById(_idTransaction);
      if (!transaction) {
        return {
          code: 404,
          error: {
            message: "Transaction not found",
          },
        };
      }

      // Tirar o saldo da conta
      const removeValue = await AccountService.addOrRemoveValue(
        transaction._idAccount,
        -transaction.value
      );

      if (removeValue.error) {
        return removeValue;
      }

      await transaction.deleteOne();

      return {
        code: 200,
        message: "Transaction deleted",
        transaction: transaction,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
};

module.exports = TransactionService;
