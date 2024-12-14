const req = require("express/lib/request");
const NotificationService = require("../services/NotificationService");

const NotificationController = {
  create: async (req, res) => {
    try {
      const notification = await NotificationService.create(req.notification);
      if (notification.error) {
        return res.status(notification.code).json({
          error: {
            code: notification.code,
            method: req.method,
            message: "Error, while create the notification",
            details: {
              controller: "NotificationController",
              cause: notification.error.message,
            },
          },
        });
      }

      return res.status(notification.code).json({
        code: notification.code,
        method: req.method,
        message: notification.message,
        notification: notification.notification,
        _links: {
          self: {
            href: `/notifications/${notification.notification._id}`,
            method: "GET",
          },
          update: {
            href: `/notifications/update/${notification.notification._id}`,
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
          message: "Error, while create notification",
          details: {
            controller: "NotificationController",
            cause: error.message,
          },
        },
      });
    }
  },
  getAll: async (req, res, next) => {
    try {
      const notification = await NotificationService.getAll();
      if (notification.error) {
        return res.status(notification.code).json({
          error: {
            code: notification.code,
            method: req.method,
            message: "Error, while getAll the notification",
            details: {
              controller: "NotificationController",
              cause: notification.error.message,
            },
          },
        });
      }

      return res.status(notification.code).json({
        code: notification.code,
        method: req.method,
        message: notification.message,
        notifications: notification.notifications,
        _links: {
          self: {
            href: `/notifications/${notification.notifications._id}`,
            method: "GET",
          },
          update: {
            href: `/notifications/update/${notification.notifications._id}`,
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
          message: "Error, while getALL notification",
          details: {
            controller: "NotificationController",
            cause: error.message,
          },
        },
      });
    }
  },
  getOne: async (req, res, next) => {
    try {
      const notification = await NotificationService.getOne(req.params.id);
      if (notification.error) {
        return res.status(notification.code).json({
          error: {
            code: notification.code,
            method: req.method,
            message: "Error, while getOne the notification",
            details: {
              controller: "NotificationController",
              cause: notification.error.message,
            },
          },
        });
      }

      return res.status(notification.code).json({
        code: notification.code,
        method: req.method,
        message: notification.message,
        notification: notification.notification,
        _links: {
          self: {
            href: `/notifications/${notification.notification._id}`,
            method: "GET",
          },
          update: {
            href: `/notifications/update/${notification.notification._id}`,
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
          message: "Error, while getOne notification",
          details: {
            controller: "NotificationController",
            cause: error.message,
          },
        },
      });
    }
  },
  getByClient: async (req, res, next) => {
    try {
      const notification = await NotificationService.getByClient(req.params.id);
      if (notification.error) {
        return res.status(notification.code).json({
          error: {
            code: notification.code,
            method: req.method,
            message: "Error, while getbyclient the notification",
            details: {
              controller: "NotificationController",
              cause: notification.error.message,
            },
          },
        });
      }

      return res.status(notification.code).json({
        code: notification.code,
        method: req.method,
        message: notification.message,
        notification: notification.notification,
        _links: {
          self: {
            href: `/notifications/${notification.notification._id}`,
            method: "GET",
          },
          update: {
            href: `/notifications/update/${notification.notification._id}`,
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
          message: "Error, while getByClient notification",
          details: {
            controller: "NotificationController",
            cause: error.message,
          },
        },
      });
    }
  },
  update: async (req, res, next) => {
    try {
      const notification = await NotificationService.update(
        req.params.id,
        req.notification
      );
      if (notification.error) {
        return res.status(notification.code).json({
          error: {
            code: notification.code,
            method: req.method,
            message: "Error, while update the notification",
            details: {
              controller: "NotificationController",
              cause: notification.error.message,
            },
          },
        });
      }

      return res.status(notification.code).json({
        code: notification.code,
        method: req.method,
        message: notification.message,
        notification: notification.notification,
        _links: {
          self: {
            href: `/notifications/${notification.notification._id}`,
            method: "GET",
          },
          update: {
            href: `/notifications/update/${notification.notification._id}`,
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
          message: "Error, while update notification",
          details: {
            controller: "NotificationController",
            cause: error.message,
          },b
        },
      });
    }
  },
  delete: async (req, res, next) => {
    try {
      const notification = await NotificationService.delete(req.params.id);
      if (notification.error) {
        return res.status(notification.code).json({
          error: {
            code: notification.code,
            method: req.method,
            message: "Error, while delete the notification",
            details: {
              controller: "NotificationController",
              cause: notification.error.message,
            },
          },
        });
      }

      return res.status(notification.code).json({
        code: notification.code,
        method: req.method,
        message: notification.message,
        notification: notification.notification,
        _links: {
          self: {
            href: `/notifications/${notification.notification._id}`,
            method: "GET",
          },
          update: {
            href: `/notifications/update/${notification.notification._id}`,
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
          message: "Error, while delete notification",
          details: {
            controller: "NotificationController",
            cause: error.message,
          },
        },
      });
    }
  },
};

module.exports = NotificationController;
