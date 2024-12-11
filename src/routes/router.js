const { Router } = require("express");
const router = Router();
const RouterClient = require("./RouterClient");
const RouterAccount = require("./RouterAccount");
const RouterTransaction = require('./RouterTransaction');

router.use("/clients", RouterClient);
router.use("/accounts", RouterAccount);
router.use("/transactions", RouterTransaction);


module.exports = router;
