const { Router } = require("express");
const ClientController = require("../controllers/ClientController");
const {ClientValidate, ClienteValidateID} = require("../middlewares/ClientValidate");
const router = Router();

// Create Client
router.post("/create", ClientValidate, ClientController.create);

// GetAll Client
router.get('/', ClientController.getAll);

// GetOne Client
router.get('/:id', ClienteValidateID, ClientController.getOne);

// Update Client
router.put('/update/:id', ClienteValidateID, ClientValidate, ClientController.update);

// Delete Client
router.delete('/delete/:id', ClienteValidateID, ClientController.delete);

module.exports = router;
