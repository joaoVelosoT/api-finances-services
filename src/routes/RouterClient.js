const { Router } = require("express");
const ClientController = require("../controllers/ClientController");
const {
  ClientValidate,
  ClientValidateID,
} = require("../middlewares/ClientValidate");
const router = Router();

// Create Client
router.post("/create", ClientValidate, ClientController.create);

// GetAll Client
router.get("/", ClientController.getAll);

// GetOne Client
router.get("/:id", ClientValidateID, ClientController.getOne);

// Update Client
router.put(
  "/update/:id",
  ClientValidateID,
  ClientValidate,
  ClientController.update
);

// Delete Client
router.delete("/delete/:id", ClientValidateID, ClientController.delete);

module.exports = router;
