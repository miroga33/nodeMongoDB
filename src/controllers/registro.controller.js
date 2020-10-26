const escapeStringRegexp = require('escape-string-regexp');

/**
 * Models
 */
const Registro = require("../models/registro");
const Animal = require("../models/animal");

const registroCtrl = {};


/**
 * Devuelve todos los registros sin filtro
 * @param {*} req 
 * @param {*} res 
 */
registroCtrl.getAll = (req, res) => {
    let { skip, limit } = req.query;

    Registro.find().skip(parseInt(skip)).limit(parseInt(limit))
        .populate({
            path: "animal"
        })
        // .populate({
        //     path: "usuario"
        // })
        .exec((err, registroDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.status(200).json({
                ok: true,
                registroDB
            });
        });
};

/**
 * Inserta registro (Perdida, Avistamiento, Recogida)
 * @param {*} req 
 * @param {*} res 
 */
registroCtrl.insertPerdida = (req, res) => {
    const { tipo, recompensa, animal } = req.body;

    const registro = new Registro({
        tipo,
        recompensa,
        animal,
        usuario: req.usuario
    });

    Registro.insertMany(registro, (err, registroDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            registroDB
        });
    });
};

/**
 * Actualiza el registro de una pérdida de animal
 * Se puede modificar únicamete el estado, y la recompensa.
 * No se puede modificar el tipo. Si el usuario erró en el tipo de registro, debería de eliminarlo
 * @param Usuario 
 * @param Registro ( _idRegistro, estado, recompensa )
 * @param Registro Nuevo registro actualizado 
 */
registroCtrl.updatePerdida = (req, res) => {
    let idUsuario = req.usuario._id;

    const { _id, estado, recompensa } = req.body;
    const update = {
        ...(estado && { estado }),
        ...(recompensa && { recompensa })
    };

    let options = { new: true, runValidators: true };
    Registro.findOneAndUpdate({ _id, usuario: idUsuario }, update, options).exec((err, registroDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!registroDB) {
            res.status(200).json({
                ok: false,
                message: "No se actualizó el registro."
            });
        }
        res.status(200).json({
            ok: true,
            message: "Registro modificado correctamente",
            registroDB
        });
    });
};



/**
 * Busqueda de registros con condiciones
 * @param {*} req 
 * @param {*} res 
 */
registroCtrl.getFilter = async(req, res) => {

    // Subconsulta por los filtros de ANIMAL
    const { nombre, raza, color, tamaño, tipo_pelo } = req.query;
    const $regex = escapeStringRegexp(nombre);
    const queryCondAnimal = {
        ...(raza && { raza }),
        ...(tamaño && { tamaño }),
        ...(color && { color }),
        ...(tipo_pelo && { tipo_pelo }),
        ...(nombre && { nombre: { $regex } })
    };


    animal = await filterAnimal(queryCondAnimal).catch(err => {
        return res.status(500).json({
            ok: false,
            err
        });
    });;

    // Consulta por los registros con los animales encontrados
    const { tipo, estado, recompensa } = req.query;

    const queryCondRegistro = {
        ...(tipo && { tipo }),
        ...(estado && { estado }),
        ...(recompensa && { recompensa }),
        ...(animal && { animal: { $in: animal } })
    };

    Registro.find(queryCondRegistro)
        .populate({ path: "animal" })
        .exec((err, registroDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.status(200).json({
                ok: true,
                total_registros: registroDB.length,
                registroDB
            });
        })



};

/**
 * Borra el registro dado de alta.
 * SOLO puede hacerlo el usuario que dió de alta el registro
 * @param {*} req 
 * @param {*} res 
 */
registroCtrl.deleteRegistro = async(req, res) => {
    let { id } = req.params;
    let idUsuario = req.usuario._id;


    Registro.findByIdAndDelete({ _id: id, usuario: idUsuario })
        .exec((err, registroDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!registroDB) {
                res.status(200).json({
                    ok: false,
                    message: "No se eliminó el registro."
                });
            }
            res.status(200).json({
                ok: true,
                message: "Registro eliminado correctamente",
                registroDB
            });

        })
}

/**
 * Consulta los animales con los parámetros de búsqueda
 * @param {filters} query 
 */
function filterAnimal(query) {
    return new Promise((resolve, reject) => {
        Animal.find(query).exec((err, animalDB) => {
            if (err) {
                reject(err);
            }
            if (!animalDB) {
                reject();
            }
            resolve(animalDB.map(a => a._id));
        });
    });

}


module.exports = registroCtrl;