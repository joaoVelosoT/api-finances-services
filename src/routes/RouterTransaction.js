const { Router } = require("express");
const {
  TransactionValidate,
  TransactionValidateID,
  TransactionValidateUpdate,
} = require("../middlewares/TransactionValidate");
const TransactionController = require("../controllers/TransactionController");
const router = Router();

// Create transaction
router.post("/create", TransactionValidate, TransactionController.create);

// GetAll Transaction
router.get("/", TransactionController.getAll);

// GetOne Transaciton
router.get("/:id", TransactionValidateID, TransactionController.getOne);

// Update Transaction
router.put(
  "/update/:id",
  TransactionValidateID,
  TransactionValidateUpdate,
  TransactionController.update
);

// GetByClient
router.get(
  "/get-by-account/:id",
  TransactionValidateID,
  TransactionController.getByAccount
);

router.delete(
  "/delete/:id",
  TransactionValidateID,
  TransactionController.delete
);

module.exports = router;
