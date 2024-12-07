const { Router } = require("express");
const router = Router();
const RouterClient = require("./RouterClient");
const routerAccount = require("./RouterAccount");

router.use("/clients", RouterClient);
router.use("/accounts", routerAccount);


module.exports = router;
