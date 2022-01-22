const Rol = require('../models/Rol')

// createAvances = async(args) =>{
//     let avancesInstance = new Avances({
//         fechaAvance: fechaHora.getTime(),
//         descripcion: args.descripcion,
//         observacionesLider: 'null',
//         estudiante: args.estudiante,
//         projects: args.projects
//     })
//     created_avances = await avancesInstance.save()
//     await userService.updateAvances(args['estudiante'], created_avances['_id'])
//     await projectService.updateAvances(args['projects'], created_avances['_id'])
//     return created_avances
// }

getRoles = async() => {
    let roles = await Rol.find({})
    return roles
}

// getAvancesById = async(avancesId)=>{
//     let avances = await Avances.findById(avancesId).exec()
//     return avances
// }

// deleteAvances = async(avancesId, avances, callback)=>{
//     let avancesd = Avances.findByIdAndDelete(avancesId, avances, callback, {new: true})
//     return avancesd
// }

// updateAvances = async(avancesId, avances)=>{
//     let newAvances = await Avances.findByIdAndUpdate(avancesId, avances,{new:true})
//     await userService.updateAvances(avances['estudiante'], newAvances['_id'])
//     await projectService.updateAvances(avances['projects'], newAvances['_id'])
//     return newAvances
// }

module.exports = {
    // createAvances,
    getAvances,
    // getAvancesById,
    // deleteAvances,
    // updateAvances
}