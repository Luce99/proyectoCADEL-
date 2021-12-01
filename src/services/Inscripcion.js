const Inscripcion = require('../models/Inscripcion')
const userService = require('./user')
const projectService = require('./Project')


createInscripcion = async(inscripcion) =>{
    let inscripcionInstance = new Inscripcion(inscripcion)
    created_inscripcion = await inscripcionInstance.save()
    await userService.updateInscripcion(inscripcion['estudiante'], created_inscripcion['_id'])
    await projectService.updateInscripcion(inscripcion['projects'], created_inscripcion['_id'])
    return created_inscripcion
}

getInscripcion = async() => {
    let inscripcion = await Inscripcion.find({})
    return inscripcion
}

getInscripcionById = async(inscripcionId)=>{
    let inscripcion = await Inscripcion.findById(inscripcionId).exec()
    return inscripcion
}

updateInscripcion = async(inscripcionId, inscripcion)=>{
    let newInscripcion = await Inscripcion.findByIdAndUpdate(inscripcionId, inscripcion,{new:true})
    return newInscripcion
}

module.exports = {
    createInscripcion,
    getInscripcion,
    getInscripcionById,
    updateInscripcion
}