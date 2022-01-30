const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Rol = require("./Rol")

const permisoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    accion: {
        type: String,
        required: true
    },
    rol: {
        type: Schema.Types.ObjectId,
        ref: "Rol"
    }
})

module.exports = mongoose.model("permiso", permisoSchema);