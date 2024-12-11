const Account = require("../models/Account");
const Client = require("../models/Client");
const ClientService = require("./ClientService");

const AccountService = {
  create: async (dataAccount) => {
    try {
      const isClientExist = await Client.findById(dataAccount._idClient);

      // Se não existir o cliente, ira parar a aplicação e retornar a mensagem de erro
      if (!isClientExist) {
        return {
          code: 404,
          error: {
            message: "Client not found",
          },
        };
      }

      const clientHaveAccount = await Account.findOne({
        _idClient: dataAccount._idClient,
      });

      // Se o cliente ja tiver uma conta criada, ira parar a aplicação e retornar a mensagem de erro
      if (clientHaveAccount) {
        return {
          code: 409,
          error: {
            message: "Account already created",
          },
        };
      }

      // Criando a conta
      const account = await Account.create(dataAccount);

      return {
        code: 201,
        message: "Account created",
        account,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getAll: async (query) => {
    try {
      // Pegando a paginação que o usuario mandou na url
      const { page = 1, details } = query;

      console.log(details);

      // Definindo o limite de cada pagina
      const limit = 20;
      // Criando variavel para definir a ultima pagina da requisição, que por padrão e 1
      var lastPage = 1;
      // Vendo a quantidade de contas
      const countAccount = await Account.countDocuments();

      if (countAccount !== 0) {
        // Fazendo conta para saber a ultima pagina, e arredondando para cima
        lastPage = Math.ceil(countAccount / 20);
      } else {
        return {
          code: 202,
          error: {
            message: "Accounts not found",
          },
        }; // se nao tiver nenhuma conta cadastrado, ira retornar uma mensagem de erro
      }
      // Definindo a quantidade de contas que ira pular ate chegar na pagina selecionada
      const skip = page * limit - limit;

      // Pegando as contas
      const accounts = await Account.find().skip(skip).limit(limit);

      // Se o usuario não quiser mais detalhes, retornar
      if (details !== "true") {
        return {
          code: 200,
          message: "All Account",
          accounts,
        };
      }

      // Criando array para manipular os dados mais detalhados
      var accountsDetails = [];

      for (const account of accounts) {
        const client = await Client.findById(account._idClient);
        console.log("aqui os client", client);

        // Se não existir o cliente, ira parar a aplicação e retornar a mensagem de erro
        if (!client) {
          return {
            code: 404,
            error: {
              message: "Client not found",
            },
          };
        }

        accountsDetails.push({
          _id: account._id,
          balance: account.balance,
          _idClient: account._idClient,
          client: {
            _id: client._id,
            name: client.name,
            email: client.email,
          },
        });
      }

      return {
        code: 200,
        message: "All Account",
        accounts: accountsDetails,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  getOne: async (query, _idAccount) => {
    try {
      const { details } = query;

      console.log(details);

      const account = await Account.findById(_idAccount);

      if (!account) {
        return {
          code: 404,
          error: {
            message: "Account not found",
          },
        };
      }

      if (details !== "true") {
        return {
          code: 200,
          message: "One Account",
          account,
        };
      }

      const client = await ClientService.getOne(account._idClient);
      if (client.code !== 200) {
        return client;
      }

      return {
        code: 200,
        message: "Account find",
        account: {
          _id: account._id,
          balance: account.balance,
          _idClient: account._idClient,
          client: {
            _id: client.client._id,
            name: client.client.name,
            email: client.client.email,
          },
        },
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  update: async (_idAccount, dataAccount) => {
    try {
      // Validar se existe a conta enviada
      const account = await Account.findById(_idAccount);
      if (!account) {
        return {
          code: 404,
          error: {
            message: "Account not found",
          },
        };
      }

      // Validar se enviaram o id para atualizar, e se enviaram, validar se enviaram certo
      if (dataAccount._idClient) {
        const client = await ClientService.getOne(dataAccount._idClient);
        if (client.error) {
          return client;
        }
      }

      // Atualizando a conta
      await account.updateOne(dataAccount);

      return {
        code: 200,
        message: "Account update",
        account,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  delete: async (_idAccount) => {
    try {
      // Validar se existe a conta
      const account = await Account.findById(_idAccount);

      // Se nao tiver a conta, devolver mensagem de erro
      if (!account) {
        return {
          code: 404,
          error: {
            message: "Account not found",
          },
        };
      }

      return {
        code: 200,
        message: "Account deleted",
        account: await Account.findByIdAndDelete(_idAccount),
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
  addValue: async (_idAccount, value) => {
    try {
      // validar se a conta existe
      const accountExist = await Account.findById(_idAccount);
      if (!accountExist) {
        return {
          code: 404,
          error: {
            message: "Account not found",
          },
        };
      }

      // Pegar o saldo da conta e adicionar o valor enviado
      
      let balanceAccount = (accountExist.balance) + value
      // console.log("funfou",Number(accountExist.balance) + value)
      // atualizar o saldo da conta 
      await accountExist.updateOne({ balance: balanceAccount });

      return {
        code: 200,
        message: "Balance updated",
        account : accountExist,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
};

module.exports = AccountService;
