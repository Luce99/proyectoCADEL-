const Rol = require('../models/Rol')

getRoles = async() => {
    let roles = await Rol.find({}).populate("permisos")
    return roles
}

module.exports = {
    getRoles
   
}