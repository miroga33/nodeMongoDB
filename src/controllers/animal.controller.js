const escapeStringRegexp = require('escape-string-regexp');

const Animal = require("../models/animal");
const animalCtrl = {};

animalCtrl.getAll = async(req, res, next) => {
    Animal.find((err, animalDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            animalDB
        });
    });
};
animalCtrl.getFilter = async(req, res, next) => {
    const { nombre, raza, color, tamaño, tipo_pelo, estado } = req.query;
    const queryCond = {
        ...(raza && { raza }),
        ...(tamaño && { tamaño }),
        ...(color && { color }),
        ...(estado && { estado }),
        ...(tipo_pelo && { tipo_pelo })
        // ...(nombre && {nombre:/regex here/}),
    };

    Animal.find(queryCond, (err, animalDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            animalDB
        });
    });
};
animalCtrl.insert = async(req, res) => {
    const {
        nombre,
        descripcion,
        raza,
        color,
        tamaño,
        tipo_pelo,
        collar,
        foto
    } = req.body;
    const animal = new Animal({
        nombre,
        descripcion,
        raza,
        color,
        tamaño,
        tipo_pelo,
        collar,
        foto
    });
    Animal.insertMany(animal, (err, animalDB) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            message: "Animal insertado correctamente",
            animalDB
        });
    });
};


animalCtrl.updateAnimal = (req, res) => {
    let idUsuario = req.usuario._id;
    let { idAnimal, nombre, descripcion, raza, sexo, color, tamaño, tipo_pelo, collar, chip } = req.body;

    let $regex;
    if (nombre) {
        $regex = escapeStringRegexp(nombre);
    }

    const update = {
        ...(nombre && { nombre: $regex }),
        ...(descripcion && { descripcion }),
        ...(raza && { raza }),
        ...(sexo && { sexo }),
        ...(color && { color }),
        ...(tamaño && { tamaño }),
        ...(tipo_pelo && { tipo_pelo }),
        ...(collar && { collar }),
        ...(chip && { chip })
    };

    let options = { new: true, runValidators: true };

    Animal.findByIdAndUpdate({ _id: idAnimal, usuario: idUsuario }, update, options).exec((err, animalDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!animalDB) {
            res.status(200).json({
                ok: false,
                message: "No se actualizó el registro."
            });
        }
        res.status(200).json({
            ok: true,
            message: "Animal modificado correctamente",
            animalDB
        });
    })

}
module.exports = animalCtrl;