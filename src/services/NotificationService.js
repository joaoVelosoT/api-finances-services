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
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getOne: async () => {
    try {
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getByClient: async () => {
    try {
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  update: async () => {
    try {
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  delete: async () => {
    try {
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
};

module.exports = NotificationService;
