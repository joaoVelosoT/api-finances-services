const Account = require("../models/Account");
const ClientService = require("./ClientService");

const AccountService = {
  create: async (dataAccount) => {
    try {
      // dataAccount -> _idClient -> validar se existe o cliente -> validar se o usuario ja tem alguma conta
      //  && balance -> nenhuma validacao no momento

      const isClientExist = await ClientService.getOne(dataAccount._idClient);

      // Se não existir o cliente, ira parar a aplicação e retornar a mensagem de erro
      if (isClientExist.code != 200) {
        return isClientExist;
      }

      const clientHaveAccount = await Account.findOne({
        _idClient: dataAccount._idClient,
      });

      // Se o cliente ja tiver uma conta criada, devolver mensagem de erro
      if (clientHaveAccount) {
        return {
          code: 409,
          error: {
            message: "Account already created",
          },
        };
      }

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
};

module.exports = AccountService;
