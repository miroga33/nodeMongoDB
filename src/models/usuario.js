const { Schema, model } = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

let rolesValidos = {
    values: ["ADMIN_ROLE", "USER_ROLE"],
    message: "{VALUE} no es un role válido"
};
let estadoUsuario = {
    values: ["ALTA", "BAJA", "PENDIENTE_VALIDAR"],
    message: "{VALUE} no es un estado válido"
};

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: false
    },
    telefono: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: rolesValidos,
        default: "USER_ROLE"
    },
    google: {
        type: Boolean,
        default: false
    },
    estado: {
        type: String,
        enum: estadoUsuario,
        default: "ALTA"
    }
}, {
    timestamps: true
});

// Apply the uniqueValidator plugin to userSchema.
usuarioSchema.plugin(uniqueValidator, {
    message: "Error, expected {PATH} to be unique."
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};
module.exports = model("Usuario", usuarioSchema);