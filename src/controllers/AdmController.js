const AdmService = require("../services/AdmService");

const AdmController = {
  create: async (req, res) => {
    try {
      const adm = await AdmService.create(req.adm);

      if (adm.error) {
        return res.staus(adm.code).json({
          code: adm.code,
          method: req.method,
          message: "Error, while create the adm",
          details: {
            controller: "AdmController",
            cause: adm.error.message,
          },
        });
      }

      return res.status(adm.code).json({
        code: adm.code,
        method: req.method,
        message: adm.message,
        adm: adm.adm,
        token: adm.token,
        _links: {
          self: {
            href: `/adms/${adm.adm._id}`,
            method: "GET",
          },
          update: {
            href: `/adms/update/${adm.adm._id}`,
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
          message: "Error, while creating the adm",
          details: {
            controller: "AdmController",
            cause: error.message,
          },
        },
      });
    }
  },
  getAll: async (req, res) => {
    try {
      const adm = await AdmService.getAll();

      if (adm.error) {
        return res.staus(adm.code).json({
          code: adm.code,
          method: req.method,
          message: "Error, while getAll the adm",
          details: {
            controller: "AdmController",
            cause: adm.error.message,
          },
        });
      }

      return res.status(adm.code).json({
        code: adm.code,
        method: req.method,
        message: adm.message,
        adm: adm.adm,
        _links: {
          self: {
            href: `/adms/${adm.adm._id}`,
            method: "GET",
          },
          update: {
            href: `/adms/update/${adm.adm._id}`,
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
          message: "Error, while getAll the adm",
          details: {
            controller: "AdmController",
            cause: error.message,
          },
        },
      });
    }
  },
  getOne: async (req, res) => {
    try {
      const adm = await AdmService.getOne(req.params.id);

      if (adm.error) {
        return res.staus(adm.code).json({
          code: adm.code,
          method: req.method,
          message: "Error, while getOne the adm",
          details: {
            controller: "AdmController",
            cause: adm.error.message,
          },
        });
      }

      return res.status(adm.code).json({
        code: adm.code,
        method: req.method,
        message: adm.message,
        adm: adm.adm,
        _links: {
          self: {
            href: `/adms/${adm.adm._id}`,
            method: "GET",
          },
          update: {
            href: `/adms/update/${adm.adm._id}`,
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
          message: "Error, while getOne the adm",
          details: {
            controller: "AdmController",
            cause: error.message,
          },
        },
      });
    }
  },
  update: async (req, res) => {
    try {
      const adm = await AdmService.update();

      if (adm.error) {
        return res.staus(adm.code).json({
          code: adm.code,
          method: req.method,
          message: "Error, while update the adm",
          details: {
            controller: "AdmController",
            cause: adm.error.message,
          },
        });
      }

      return res.status(adm.code).json({
        code: adm.code,
        method: req.method,
        message: adm.message,
        adm: adm.adm,
        _links: {
          self: {
            href: `/adms/${adm.adm._id}`,
            method: "GET",
          },
          update: {
            href: `/adms/update/${adm.adm._id}`,
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
          message: "Error, while update the adm",
          details: {
            controller: "AdmController",
            cause: error.message,
          },
        },
      });
    }
  },
  delete: async (req, res) => {
    try {
      const adm = await AdmService.delete(req.adm);

      if (adm.error) {
        return res.staus(adm.code).json({
          code: adm.code,
          method: req.method,
          message: "Error, while delete the adm",
          details: {
            controller: "AdmController",
            cause: adm.error.message,
          },
        });
      }

      return res.status(adm.code).json({
        code: adm.code,
        method: req.method,
        message: adm.message,
        adm: adm.adm,
        _links: {
          self: {
            href: `/adms/${adm.adm._id}`,
            method: "GET",
          },
          update: {
            href: `/adms/update/${adm.adm._id}`,
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
          message: "Error, while delete the adm",
          details: {
            controller: "AdmController",
            cause: error.message,
          },
        },
      });
    }
  },
};

module.exports = AdmController;
