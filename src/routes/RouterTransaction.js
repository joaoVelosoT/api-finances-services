const { Router } = require("express");
const { TransactionValidate } = require("../middlewares/TransactionValidate");
const TransactionController = require("../controllers/TransactionController");
const router = Router();


// Create transaction
router.post("/create", TransactionValidate, TransactionController.create);

// GetAll Transaction
router.get("/", TransactionController.getAll);




module.exports = router;