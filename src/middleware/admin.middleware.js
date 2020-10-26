const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

router.use("/usuario/delete/:id", adminRole);


//FUNCION QUE VALIDA SI SE TIENE EL ADMIN_ROLE
function adminRole(req, res, next) {
    const token = req.get("token");

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Token inválido"
                }
            });
        }
        req.usuario = decoded.usuario;
        console.log(req.usuario.role);
        if (req.usuario.role !== "ADMIN_ROLE") {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Operación no autorizada"
                }
            });
        }
        next();
    });
}
module.exports = router;