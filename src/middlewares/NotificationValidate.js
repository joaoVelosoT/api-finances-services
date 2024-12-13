const isMongoID = require("../utils/ValidationsUtils");

const NotificationValidate = (req, res, next) => {
  try {
    const { _idClient, message } = req.body;

    // Validando se enviaram o id do cliente
    if (!_idClient) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Invalid notification data",
        details: {
          cause: "The idClient is required",
        },
      });
    }

    // Validando se o id enviado e um mongoID
    const isValidId = isMongoID(_idClient);

    if (!isValidId.success) {
      return res.status(isValidId.error.code).json({
        code: isValidId.error.code,
        method: req.method,
        message: "Invalid notification data",
        details: {
          cause: isValidId.error.details.cause,
        },
      });
    }

    if (!message) {
      return res.status(400).json({
        code: 400,
        method: req.method,
        message: "Invalid notification data",
        details: {
          cause: "The message is required",
        },
      });
    }

    req.notification = {
      _idClient,
      message,
    };

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        code: 500,
        method: req.method,
        message: "Error, while valide the notification",
        details: {
          cause: error.message,
        },
      },
    });
  }
};

const NotificationValidateID = async (req, res, next) => {
  try {
    const isValidId = await isMongoID(req.params.id);

    if (!isValidId.success) {
      return res.status(isValidId.error.code).json({
        code: isValidId.error.code,
        method: req.method,
        message: "Invalid notification id",
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
        message: "Error, while valide the notificationID",
        details: {
          cause: error.message,
        },
      },
    });
  }
};

const NotificationValidateUpdate = async (req, res, next) => {
  try {
    const { _idClient, message, dateNotification } = req.body;

    if (_idClient) {
      // Validando se o id enviado e um mongoID
      const isValidId = isMongoID(_idClient);

      if (!isValidId.success) {
        return res.status(isValidId.error.code).json({
          code: isValidId.error.code,
          method: req.method,
          message: "Invalid notification data",
          details: {
            cause: isValidId.error.details.cause,
          },
        });
      }
    }

    // Validar se e realmente uma data
    // if(dateNotification){
    //    if(dateNotification ) 
    // }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        code: 500,
        method: req.method,
        message: "Error, while valide the notification update",
        details: {
          cause: error.message,
        },
      },
    });
  }
};

module.exports = { NotificationValidate, NotificationValidateID };
