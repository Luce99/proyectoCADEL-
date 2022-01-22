const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Rol = mongoose.model("rol", RolSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    permisos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Permiso"
        }
    ]
}))

module.exports = Rol;