const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;
const tiposRegistro = {
    values: ["Perdida", "Recogida", "Avistamiento"],
    message: "{VALUE} no es un estado válido"
};
const estadosValidos = {
    values: ["Perdido", "Encontrado", "En casa"],
    message: "{VALUE} no es un estado válido"
};

const registroSchema = new Schema({
    tipo: {
        //avistamiento | recogida | perdida
        type: String,
        enum: tiposRegistro,
        required: true
    },
    estado: {
        type: String,
        default: "Perdido",
        enum: estadosValidos
    },
    recompensa: {
        type: String,
        default: false
    },
    usuario: [{ type: ObjectId, ref: "Usuario" }],
    animal: [{ type: ObjectId, ref: "Animal" }]
}, {
    timestamps: true
});


module.exports = model("Registro", registroSchema);