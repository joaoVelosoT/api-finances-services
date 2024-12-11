const { Router } = require("express");
const { TransactionValidate } = require("../middlewares/TransactionValidate");
const TransactionController = require("../controllers/TransactionController");
const router = Router();


// Create transaction
router.post("/create", TransactionValidate, TransactionController.create);




module.exports = router;