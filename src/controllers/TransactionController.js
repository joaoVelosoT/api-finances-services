const TransactionController = {
  create: async (req, res) => {
    try {
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
  getAll: async (req, res) => {
    try {
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
  delete: async (req, res) => {
    try {
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
};

module.exports = TransactionController;
