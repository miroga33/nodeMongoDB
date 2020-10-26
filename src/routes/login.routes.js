const { Router } = require("express");
const router = Router();
const { loginCtrl } = require("../controllers/index.controller");

router.post("/login", loginCtrl.login);

module.exports = router;