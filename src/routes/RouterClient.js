const { Router } = require("express");
const ClientController = require("../controllers/ClientController");
const ClientValidate = require("../middlewares/ClientValidate");
const router = Router();

// Create Client
router.post("/create", ClientValidate, ClientController.create);

// GetAll Client
router.get('/', ClientController.getAll);

module.exports = router;
