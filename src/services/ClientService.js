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
  getAll: async (query) => {
    try {
      // Estudando paginação

      // Pegando a pagina que o usuario mandou;
      const { page = 1, name, email } = query;

      // Fazendo uma filtragem com base no que o usuario mandou na url
      var filter = {};
      if (name) {
        filter.name = name;
      }
      if (email) {
        filter.email = email;
      }

      

      // Pegar o limite de cada busca no db;
      const limit = 10;

      // Criar variavel com o numero da ultima pagina, por padrao e 1
      var lastPage = 1;

      // Pegar no db a quantidade de clients
      const countClient = await Client.countDocuments();

      if (countClient !== 0) {
        lastPage = Math.ceil(countClient / limit); // Dividindo a quantidade de cliente com o limite, vamos ter a ultima pagina
      } else {
        return "err"; // se nao tiver nenhum cliente cadastrado, ira retornar uma mensagem de erro
      }

      const skip = page * limit - limit; // conta para saber quantos clientes vao pular ate chegar na paginação escolhida

      const clients = await Client.find(filter).skip(skip).limit(limit); // fazendo o get, mandando quantos clientes vao pular, e o limite de quantos vao trazer

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
