const { Router } = require("express");
const router = Router();
const { animalCtrl } = require("../controllers/index.controller");

//Se puede utilizar como middleware de la ruta animal
// router.use((req, res, next) => {
//     console.log("Pasando por el middelware Animal");
//     next();
// });

router.get("/animal", animalCtrl.getAll);
router.get("/animal/busqueda", animalCtrl.getFilter);
router.post("/animal", animalCtrl.insert);
router.put("/animal", animalCtrl.updateAnimal);

module.exports = router;