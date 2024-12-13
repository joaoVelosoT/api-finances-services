const { Router } = require("express");
const router = Router();
const RouterClient = require("./RouterClient");
const RouterAccount = require("./RouterAccount");
const RouterTransaction = require('./RouterTransaction');
const RouterNotification = require('./RouterNotification');


router.use("/clients", RouterClient);
router.use("/accounts", RouterAccount);
router.use("/transactions", RouterTransaction);
router.use("/notifications", RouterNotification);

module.exports = router;
