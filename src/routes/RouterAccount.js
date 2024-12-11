const { Router } = require("express");
const isMongoID = require("../utils/ValidationsUtils");
const {
  AccountValidate,
  AccountValidateID,
  AccountValidateUpdate,
  AccountValidateAddValue,
} = require("../middlewares/AccountValidate");
const AccountController = require("../controllers/AccountController");
const router = Router();

// Create account
router.post("/create", AccountValidate, AccountController.create);

// GetAll Account
router.get("/", AccountController.getAll);

// GetOne Account
router.get("/:id", AccountValidateID, AccountController.getOne);

//Update Account
router.put("/update/:id", AccountValidateUpdate, AccountController.update);

//Delete Account
router.delete("/delete/:id", AccountValidateID, AccountController.delete);

//Add value
router.patch(
  "/add-value/:id",
  AccountValidateID,
  AccountValidateAddValue,
  AccountController.addValue
);

module.exports = router;
