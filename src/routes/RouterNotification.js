const { Router } = require("express");
const { NotificationValidate, NotificationValidateID } = require("../middlewares/NotificationValidate");
const NotificationController = require("../controllers/NotificationController");
const router = Router();

// Create notification
router.post("/create", NotificationValidate, NotificationController.create);

//GetAll notification
router.get("/", NotificationController.getAll);

//GetOne notification
router.get("/:id", NotificationValidateID, NotificationController.getOne);

//GetByClient notification
router.get(
  "/get-by-client/:id",
  NotificationValidateID,
  NotificationController.getByClient
);

//Update notification
router.put(
  "/update/:id",
  NotificationValidateID,
  NotificationController.update
);

// Delete notification
router.delete(
  "/delete/:id",
  NotificationValidateID,
  NotificationController.delete
);
module.exports = router;
