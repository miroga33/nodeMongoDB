const express = require("express");
const router = express.Router();

router.use(require("./token.middleware"));
router.use(require("./admin.middleware"));

module.exports = router;