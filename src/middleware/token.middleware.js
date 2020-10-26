const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

// TOKEN AUTHENTICATION

router.use("/usuario/:id", authenticationToken);

router.use("/registro/perdida", authenticationToken);
router.use("/registro/perdida/:id", authenticationToken);

router.use("/animal", (req, res, next) => {
    if (req.method == 'PUT') {
        authenticationToken(req, res, next);
    }
    next();
});

function authenticationToken(req, res, next) {
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
        next();
    });
}
module.exports = router;