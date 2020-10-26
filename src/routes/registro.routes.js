const { Router } = require("express");
const router = Router();
const registroCtrl = require("../controllers/registro.controller");

//Se puede utilizar como middleware de la ruta animal
// router.use((req, res, next) => {
//     console.log("Pasando por el middelware REGISTRO");
//     next();
// });
router.get("/registro", registroCtrl.getAll);
router.get("/registro/busqueda", registroCtrl.getFilter);
router.post("/registro/perdida", registroCtrl.insertPerdida);
router.put("/registro/perdida", registroCtrl.updatePerdida);
router.delete("/registro/perdida/:id", registroCtrl.deleteRegistro);

module.exports = router;