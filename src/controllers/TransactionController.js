const TransactionService = require("../services/TransactionService");

const TransactionController = {
  create: async (req, res) => {
    try {
      const transaction = await TransactionService.create(req.transaction);
      if (transaction.error) {
        return res.status(transaction.code).json({
          error: {
            code: transaction.code,
            method: req.method,
            message: "Error, while creating the transaction",
            details: {
              controller: "TransactionController",
              cause: transaction.error.message,
            },
          },
        });
      }

      return res.status(transaction.code).json({
        code: transaction.code,
        method: req.method,
        message: transaction.message,
        transaction: transaction.transaction,
        _links: {
          self: {
            href: `/transactions/${transaction.transaction._id}`,
            method: "GET",
          },
          update: {
            href: `/transactions/update${transaction.transaction._id}`,
            method: "PUT",
            description: "Update a transaction",
          },
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while create Transaction",
          details: {
            controller: "TransactionController",
            cause: error.message,
          },
        },
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const transactions = await TransactionService.getAll(req.query);

      if (transactions.error) {
        return res.status(transactions.code).json({
          code: transactions.code,
          method: req.method,
          message: "Erro, while getAll Transactions",
          details: {
            controller: "TransactionController",
            cause: transactions.error.message,
          },
        });
      }

      return res.status(transactions.code).json({
        code: transactions.code,
        method: req.method,
        message: transactions.message,
        transactions: transactions.transactions,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while get all the client",
          details: {
            controller: "ClientController",
            cause: error.message,
          },
        },
      });
    }
  },
  getOne: async (req, res) => {
    try {
      const transaction = await TransactionService.getOne(
        req.params.id,
        req.query
      );
      if (transaction.error) {
        return res.status(transaction.code).json({
          code: transaction.code,
          method: req.method,
          message: "Error, while getOne transaction",
          details: {
            controller: "TransactionController",
            cause: transaction.error.message,
          },
        });
      }

      return res.status(transaction.code).json({
        code: transaction.code,
        method: req.method,
        message: transaction.message,
        transaction: transaction.transaction,
        _links: {
          self: {
            href: `/transactions/${transaction.transaction._id}`,
            method: "GET",
          },
          update: {
            href: `/transactions/update${transaction.transaction._id}`,
            method: "PUT",
            description: "Update a transaction",
          },
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while get all the client",
          details: {
            controller: "ClientController",
            cause: error.message,
          },
        },
      });
    }
  },
  update: async (req, res) => {
    try {
      const transaction = await TransactionService.update(
        req.params.id,
        req.transaction
      );
      if (transaction.error) {
        return res.status(transaction.code).json({
          code: transaction.code,
          method: req.method,
          message: "Error, while update transaction",
          error: {
            controller: "TransactionController",
            cause: transaction.error.message,
          },
        });
      }

      return res.status(transaction.code).json({
        code: transaction.code,
        method: req.method,
        message: transaction.message,
        transaction: transaction.transaction,
        _links: {
          self: {
            href: `/transactions/${transaction.transaction._id}`,
            method: "GET",
          },
          update: {
            href: `/transactions/update${transaction.transaction._id}`,
            method: "PUT",
            description: "Update a transaction",
          },
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while update the transaction",
          details: {
            controller: "ClientController",
            cause: error.message,
          },
        },
      });
    }
  },
  delete: async (req, res) => {
    try {
      const transaction = await TransactionService.delete(req.params.id);

      if (transaction.error) {
        res.status(transaction.code).json({
          code: transaction.code,
          method: req.method,
          message: "Error, while delete transaction",
          details: {
            controller: "TransactionController",
            cause: transaction.error.message,
          },
        });
      }

      return res.status(transaction.code).json({
        code: transaction.code,
        method: req.method,
        message: transaction.message,
        transaction: transaction.transaction,
        _links: {
          self: {
            href: `/transactions/${transaction.transaction._id}`,
            method: "GET",
          },
          update: {
            href: `/transactions/update${transaction.transaction._id}`,
            method: "PUT",
            description: "Update a transaction",
          },
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while get all the client",
          details: {
            controller: "ClientController",
            cause: error.message,
          },
        },
      });
    }
  },
  getByAccount: async (req, res) => {
    try {
      const transactions = await TransactionService.getByAccount(req.params.id);

      if (transactions.error) {
        return res.status(transactions.code).json({
          code: transactions.code,
          method: req.method,
          message: "Error, while get transactions by client",
          details: {
            controller: "TransactionsController",
            cause: transactions.error.message,
          },
        });
      }

      return res.status(transactions.code).json({
        code: transactions.code,
        method: req.method,
        message: transactions.message,
        transactions: transactions.transactions,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while get transaction by client",
          details: {
            controller: "TransactionController",
            cause: error.message,
          },
        },
      });
    }
  },
};

module.exports = TransactionController;
