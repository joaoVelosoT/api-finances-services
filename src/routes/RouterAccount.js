const { Router } = require("express");
const isMongoID = require("../utils/ValidationsUtils");
const {
  AccountValidate,
  AccountValidateID,
} = require("../middlewares/AccountValidate");
const AccountController = require("../controllers/AccountController");
const router = Router();

// Create account
router.post("/create", AccountValidate, AccountController.create);

// GetAll Account
router.get("/", AccountController.getAll);

// GetOne Account
router.get("/:id", AccountValidateID, AccountController.getOne);

module.exports = router;
