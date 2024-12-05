const ClientService = require("../services/ClientService");

const ClientController = {
  create: async (req, res) => {
    try {
      const client = await ClientService.create(req.client);

      if (client.error) {
        return res.status(client.code).json({
          error: {
            code: client.code,
            method: req.method,
            message: "Error, while creating the client",
            details: {
              controller: "ClientController",
              cause: client.error.message,
            },
          },
        });
      }

      return res.status(client.code).json({
        code: client.code,
        method: req.method,
        message: client.message,
        client: client.client,
        _links: {
          self: {
            href: `/clients/${client.client._id}`,
            method: "GET",
          },
          delete: {
            href: "/clients/delete",
            method: "DELETE",
            description: "Delete a client",
          },
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: 500,
          method: req.method,
          message: "Error, while creating the client",
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
      const clients = await ClientService.getAll();

      return res.status(clients.code).json({
        code: clients.code,
        method: req.method,
        message: clients.message,
        clients: clients.clients,
        _links: {
          self: {
            href: "/clients",
            method: req.method,
          },
          create: {
            href: "/clients/create",
            method: "POST",
            description: "Create a new client",
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
};

module.exports = ClientController;
