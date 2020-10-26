const { Schema, model } = require("mongoose");

const locSchema = new Schema({
    coord: {
        type: String,
        required: false
    },
    pais: {
        type: String,
        required: false
    },
    provincia: {
        type: String,
        required: false
    },
    municipio: {
        type: String,
        required: false
    },
    barrio: {
        type: String,
        required: false
    }
});

module.exports = model("Loc", locSchema);