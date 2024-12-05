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
};

module.exports = ClientService;
