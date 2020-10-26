const { Schema, model } = require("mongoose");

const animalSchema = new Schema({
    nombre: {
        type: String,
        required: false
    },
    descripcion: {
        type: String,
        max: 250,
        required: true
    },
    raza: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    tamaño: {
        type: String,
        required: true
    },
    tipo_pelo: {
        type: String,
        required: false
    },
    collar: {
        type: Boolean,
        required: true
    },
    foto: {
        type: String,
        required: true
    }
});

module.exports = model("Animal", animalSchema);