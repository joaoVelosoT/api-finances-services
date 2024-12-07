const AccountService = require("../services/AccountService");

const AccountController = {
  create: async (req, res) => {
    try {
      const account = await AccountService.create(req.account);

      if (account.code !== 201) {
        return res.status(account.code).json({
          error: {
            code: account.code,
            method: req.method,
            message: "Error, while create the account",
            details: {
              controller: "AccountController",
              cause: account.error.message,
            },
          },
        });
      }

      return res.status(account.code).json({
        code: account.code,
        method: req.method,
        message: account.message,
        account: account.account,
        _links: {
          self: {
            href: `/accounts/${account.account._id}`,
            method: "GET",
          },
          update: {
            href: `/accounts/update/${account.account._id}`,
            method: "PUT",
            description: "Update a account",
          },
        },
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while creating the account",
          details: {
            controller: "AccountController",
            cause: error.message,
          },
        },
      });
    }
  },
  getAll: async (req, res) => {
    try {
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while creating the account",
          details: {
            controller: "AccountController",
            cause: error.message,
          },
        },
      });
    }
  },
  getOne: async (req, res) => {
    try {
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while creating the account",
          details: {
            controller: "AccountController",
            cause: error.message,
          },
        },
      });
    }
  },
  update: async (req, res) => {
    try {
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while creating the account",
          details: {
            controller: "AccountController",
            cause: error.message,
          },
        },
      });
    }
  },
  delete: async (req, res) => {
    try {
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while creating the account",
          details: {
            controller: "AccountController",
            cause: error.message,
          },
        },
      });
    }
  },
};

module.exports = AccountController;
