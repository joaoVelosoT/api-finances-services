const { Router } = require("express");
const router = Router();
const RouterClient = require("./RouterClient");
const RouterAccount = require("./RouterAccount");
const RouterTransaction = require("./RouterTransaction");
const RouterNotification = require("./RouterNotification");
const RouterAdm = require("./RouterAdm");

router.use("/clients", RouterClient);
router.use("/accounts", RouterAccount);
router.use("/transactions", RouterTransaction);
router.use("/notifications", RouterNotification);
router.use("/adms", RouterAdm);


module.exports = router;
