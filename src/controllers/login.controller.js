const Usuario = require("../models/usuario");

//LOGIN
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { EXP, SECRET } = process.env;

const loginCtrl = {};

loginCtrl.login = (req, res) => {
    const { email, password } = req.body;
    const usuario = new Usuario({
        email: email,
        password: password
    });

    Usuario.findOne({ email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                message: "Usuario o contraseña incorrectos"
            });
        }
        if (!bcrypt.compareSync(usuario.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                message: "Usuario o contraseña incorrectos"
            });
        }
        res.json({
            ok: true,
            message: "Login correcto",
            usuarioDB,
            token: setToken(usuarioDB)
        });
    });
};

function setToken(usuario) {
    const token = jwt.sign({ usuario }, SECRET, { expiresIn: EXP });

    return token;
}

module.exports = loginCtrl;