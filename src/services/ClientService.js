const Client = require("../models/Client");

const ClientService = {
  create: async (dataClient) => {
    try {
      const isEmailExist = await Client.findOne({ email: dataClient.email });
      if (isEmailExist) {
        return {
          code: 409,
          error: {
            message: "Email already exists",
          },
        };
      }

      const client = await Client.create(dataClient);

      return {
        code: 201,
        message: "Client created",
        client,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getAll: async () => {
    try {
      const clients = await Client.find();

      return {
        code: 200,
        message: "All Client",
        clients,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getOne: async (id) => {
    try {
      const client = await Client.findById(id);
      if (!client) {
        return {
          code: 404,
          error: {
            message: "Client not found",
          },
        };
      }

      return {
        code: 200,
        message: "Client find",
        client: client,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  update: async (id, dataClient) => {
    try {
      const client = await Client.findById(id);
      if (!client) {
        return {
          code: 404,
          error: {
            message: "Client not found",
          },
        };
      }

      const isEmailExist = await Client.findOne({ email: dataClient.email });
      if (isEmailExist) {
        return {
          code: 409,
          error: {
            message: "Email already exists",
          },
        };
      }

      await client.updateOne(dataClient);
      return {
        code: 200,
        message: "Client Updated",
        client: client,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  delete: async (id) => {
    try {
      const client = await Client.findById(id);
      if (!client) {
        return {
          code: 404,
          error: {
            message: "Client not found",
          },
        };
      }

      // deletar a conta do cliente
      await client.deleteOne();

      return {
        code: 200,
        message: "Client Deleted",
        client: client,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
};

module.exports = ClientService;
