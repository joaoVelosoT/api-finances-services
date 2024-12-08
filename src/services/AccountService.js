const Account = require("../models/Account");
const ClientService = require("./ClientService");

const AccountService = {
  create: async (dataAccount) => {
    try {
      const isClientExist = await ClientService.getOne(dataAccount._idClient);

      // Se não existir o cliente, ira parar a aplicação e retornar a mensagem de erro
      if (isClientExist.code != 200) {
        return isClientExist;
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
      const { page = 1 } = query;

      const limit = 20;

      var lastPage = 1;

      const countAccount = await Account.countDocuments();

      if (countAccount !== 0) {
        lastPage = Math.ceil(countAccount / 20);
      } else {
        return {
          code: 202,
          error: {
            message: "Accounts not found",
          },
        }; // se nao tiver nenhuma conta cadastrado, ira retornar uma mensagem de erro
      }

      const skip = page * limit - limit;

      const accounts = await Account.find().skip(skip).limit(limit);

      return {
        code : 200,
        message : "All Account",
        accounts
      }
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  },
};

module.exports = AccountService;
