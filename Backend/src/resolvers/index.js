const {projectResolvers} = require('./Project')
const {userResolvers} = require('./user')
const {inscripcionResolvers} = require ('./Inscripcion')
const {avancesResolvers} = require ('./Avance')
const {rolResolvers} = require ('./Rol')
const dateTime  = require('./datetime')

const resolvers = [projectResolvers, userResolvers, inscripcionResolvers, avancesResolvers, rolResolvers, dateTime]

module.exports = {resolvers}
