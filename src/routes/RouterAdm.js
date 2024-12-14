const { Router } = require("express");
const { AdmValidate, AdmValidateID } = require("../middlewares/AdmValidate");
const AdmController = require("../controllers/AdmController");
const router = Router();

// Create adm
router.post("/create", AdmValidate, AdmController.create);

// GetAll adm
router.get("/", AdmController.getAll);

// GetOne adm
router.get("/:id", AdmValidateID, AdmController.getOne);

// Update adm
router.put("/update/:id", AdmValidateID, AdmController.update);

// Delete adm
router.delete("/delete/:id", AdmValidateID, AdmController.delete);

module.exports = router;
