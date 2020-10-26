const express = require("express");
const router = express.Router();
const usuarioCtrl = require("../controllers/usuario.controller");

//CRUD
router.get("/usuario", usuarioCtrl.getAll);
router.get("/usuario/:id", usuarioCtrl.getUser);
router.delete("/usuario/:id", usuarioCtrl.unsubscribe);
router.delete("/usuario/delete/:id", usuarioCtrl.delete);
router.get("/usuarios", usuarioCtrl.getUserPage);
router.post("/usuario", usuarioCtrl.insert);
router.put("/usuario/:id", usuarioCtrl.update);

module.exports = router;