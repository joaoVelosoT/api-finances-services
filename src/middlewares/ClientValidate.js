const ClientValidate = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || typeof name != "string") {
      return res.status(400).json({
        error: {
          code: 400,
          method: req.method,
          message: "Invalid client data",
          details: {
            cause: "'name' is required and must be a string",
          },
        },
      });
    }

    if (!email || typeof email != "string") {
      return res.status(400).json({
        error: {
          code: 400,
          method: req.method,
          message: "Invalid client data",
          details: {
            cause: "'email' is required and must be a string",
          },
        },
      });
    }

    req.client = {
      name,
      email,
    };
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        code: codeError || 500,
        method: req.method,
        message: "Error, while valide the client",
        details: {
          cause: error.message,
        },
      },
    });
  }
};

module.exports = ClientValidate;
