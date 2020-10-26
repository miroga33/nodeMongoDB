const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
//libreria con funcionalidades de JS
const _ = require("underscore");
const usuarioCtrl = {};

usuarioCtrl.getAll = (req, res) => {
    Usuario.find((err, usuarioDB) => {
        Usuario.count((err, contador) => {
            res.status(200).json({
                ok: true,
                registros: contador,
                usuarioDB
            });
        });
    });
};

// GET USER BY ID
// /usuario/:id
// @params id
// @header token
// return usuario
usuarioCtrl.getUser = (req, res) => {
    let id = req.params.id;
    Usuario.findById({ _id: id }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                err,
                message: "Usuario no registrado"
            });
        }
        usuarioDB.password = undefined;

        res.status(200).json({
            ok: true,
            usuarioDB
        });
    });
};

usuarioCtrl.getUserPage = (req, res) => {
    const desde = Number(req.desde) || 0;
    const hasta = Number(req.hasta) || 0;

    Usuario.find({ estado: "ALTA" })
        .skip(desde)
        .limit(hasta)
        .exec((err, usuarioDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!usuarioDB) {
                return res.status(404).json({
                    ok: false,
                    err,
                    message: "No existen usuarios registrados"
                });
            }

            res.status(200).json({
                ok: true,
                usuarioDB
            });
        });
};
// INSERT USER
// /usuario
// @post user
// return ok
usuarioCtrl.insert = (req, res) => {
    const { email, telefono, nombre, password } = req.body;
    const salt = bcrypt.genSaltSync();
    console.log("salt", salt);
    const usuario = new Usuario({
        email,
        telefono,
        nombre,
        password: bcrypt.hashSync(password, salt)
    });

    Usuario.insertMany(usuario, async(err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            usuarioDB
        });
    });
};

usuarioCtrl.update = (req, res) => {
    const id = req.params.id;

    const usuario = _.pick(req.body, ["nombre", "telefono", "estado"]);
    console.log(usuario);
    Usuario.findByIdAndUpdate(
        id,
        usuario, { new: true, runValidators: true },
        (err, usuarioDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.status(200).json({
                ok: true,
                message: "Usuario actualizado correctamente",
                usuarioDB
            });
        }
    );
};

usuarioCtrl.unsubscribe = (req, res) => {
    const id = req.params.id;
    Usuario.findByIdAndUpdate({ _id: id }, { estado: "BAJA" }, { useFindAndModify: true, new: true, runValidators: true },
        (err, usuarioDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!usuarioDB) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: "Usuario no registrado"
                    }
                });
            }
            res.json({
                ok: true,
                message: "Usuario dado de BAJA correctamente",
                usuarioDB
            });
        }
    );
};
usuarioCtrl.delete = (req, res) => {
    const id = req.params.id;
    Usuario.findByIdAndDelete({ _id: id }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: "Usuario no registrado"
                }
            });
        }
        res.json({
            ok: true,
            message: "Usuario eliminado correctamente",
            usuarioDB
        });
    });
};

module.exports = usuarioCtrl;