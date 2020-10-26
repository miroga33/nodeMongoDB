const express = require("express");
const router = express.Router();
// router.use(require("./registro.routes"));
router.use(require("./animal.routes"));
router.use(require("./usuario.routes"));
router.use(require("./login.routes"));
router.use(require("./registro.routes"));

module.exports = router;