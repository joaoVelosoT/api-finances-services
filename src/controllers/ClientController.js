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
          update: {
            href: `/clients/update${client.client._id}`,
            method: "PUT",
            description: "Update a client",
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
      // console.log(req.query);
      const clients = await ClientService.getAll(req.query);

      if(clients.error){
        return res.status(clients.code).json({
          error: {
            code: clients.code,
            method: req.method,
            message: "Error, while getAll the client",
            details: {
              controller: "ClientController",
              cause: clients.error.message,
            },
          },
        });
      }

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
  getOne: async (req, res) => {
    try {
      const client = await ClientService.getOne(req.params.id);

      if (client.error) {
        return res.status(client.code).json({
          error: {
            code: client.code,
            method: req.method,
            message: "Error, while getOne the client",
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
            href: `/clients/delete/${client.client._id}`,
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
      const client = await ClientService.update(req.params.id, req.client);

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
            href: `/clients/delete/${client.client._id}`,
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
      const client = await ClientService.delete(req.params.id);

      if (client.error) {
        return res.status(client.code).json({
          error: {
            code: client.code,
            method: req.method,
            message: "Error, while delete the client",
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
          create: {
            href: `/clients/create`,
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
