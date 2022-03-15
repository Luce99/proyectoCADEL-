const mongoose = require('mongoose')
const Schema = mongoose.Schema
const permiso = require ("./permiso")

const  RolSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    permisos: [
        {
            type: Schema.Types.ObjectId,
            ref: "permiso"
        }
    ]
})

module.exports = mongoose.model("Rol",RolSchema)