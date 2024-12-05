const { Router } = require("express");
const router = Router();
const RouterClient = require("./RouterClient");

router.use("/clients", RouterClient);

module.exports = router;
