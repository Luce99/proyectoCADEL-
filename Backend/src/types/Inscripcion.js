const {gql} = require("apollo-server-express")
const inscripcionType = gql`

scalar DateTime

type User{
    _id: ID!
    nombre: String!
    apellido: String!
    identificacion: String!
    estado: String!
    correo: String!
    contrasena: String!
    Rol: Rol!
    projects: [Project!]
    
}
type Project {
    _id: ID!
    nombre: String!
    objetivosGenerales: String!
    objetivosEspecificos: String!
    fechaInicio: DateTime!
    fechaTerminacion: DateTime!
    estadoProyecto: String!
    faseProyecto: String!
    presupuesto: Float!
    avances: [Avances!]
    owner: ID!
}
type Inscripcion {
    _id: String!
    estadoInscripcion: String!
    fechaIngreso: DateTime!
    fechaEgreso: DateTime!
    estudiante: String!
    projects: String!
}
type Query {
    getInscripcion: [Inscripcion]
    getInscripcionById(_id:String):Inscripcion
}
type Mutation {
createInscripcion(
    estadoInscripcion: String
    fechaIngreso: DateTime
    fechaEgreso: DateTime
    estudiante: String!
    projects: String!
    ): Inscripcion
updateInscripcion (
    _id: String!
    estadoInscripcion: String
    fechaIngreso: DateTime
    fechaEgreso: DateTime
    estudiante: String
    projects: String
    ): Inscripcion
deleteInscripcion (
    _id: String!
    estadoInscripcion: String
    fechaIngreso: DateTime
    fechaEgreso: DateTime
    estudiante: String
    projects: String
    ): Inscripcion
}
`;

module.exports = {inscripcionType}
