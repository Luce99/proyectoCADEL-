const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Permiso = mongoose.model("permiso", PermisoSchema = new Schema({
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
}))

module.exports = Permiso