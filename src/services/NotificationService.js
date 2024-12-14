const Client = require("../models/Client");
const Notification = require("../models/Notification");

const NotificationService = {
  create: async (dataNotification) => {
    try {
      // Validar se o cliente existe
      const client = await Client.findById(dataNotification._idClient);
      if (!client) {
        return {
          code: 404,
          error: {
            message: "Client not found",
          },
        };
      }

      const notification = await Notification.create(dataNotification);

      return {
        code: 201,
        message: "Notification created",
        notification: notification,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getAll: async () => {
    try {
      const notifications = await Notification.find();

      return {
        code: 200,
        message: "All notification",
        notifications: notifications,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getOne: async (_idNotification) => {
    try {
      const notification = await Notification.findById(_idNotification);
      if (!notification) {
        return {
          code: 404,
          error: {
            message: "Notification not found",
          },
        };
      }

      return {
        code: 200,
        message: "Notification found",
        notification: notification,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getByClient: async (_idClient) => {
    try {
      const notification = await Notification.find({ _idClient: _idClient });

      if (notification.length === 0) {
        return {
          code: 404,
          error: {
            message: "Notifications not found",
          },
        };
      }

      return {
        code: 200,
        message: "Notification by client finded",
        notification: notification,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  update: async (_idNotification, dataNotification) => {
    try {
      const notification = await Notification.findById(_idNotification);
      if (!notification) {
        return {
          code: 404,
          error: {
            message: "Notification not found",
          },
        };
      }

      // Se tiver o update de _idClient, validar se existe o cliente
      if (dataNotification._idClient) {
        const client = await Client.findById(dataNotification._idClient);
        if (!client) {
          return {
            code: 404,
            error: {
              message: "Client not found",
            },
          };
        }
      }

      await notification.updateOne(dataNotification);

      return {
        code: 200,
        message: "Notification updated",
        notification: notification,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  delete: async (_idNotification) => {
    try {
      const notification = await Notification.findById(_idNotification);

      if (!notification) {
        return {
          code: 404,
          error: {
            message: "Notification not found",
          },
        };
      }

      await notification.deleteOne();

      return {
        code: 200,
        message: "Notification deleted with success",
        notification: notification,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
};

module.exports = NotificationService;
