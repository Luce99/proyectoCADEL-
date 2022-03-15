const {gql} = require("apollo-server-express")


const userType = gql`
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
    projects: [Project]
}

type Rol {
    nombre: String!
    permisos: [Permiso!]
}

type Permiso {
    nombre: String
    accion: String
}

type Project{
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

type Query {
    getUsers: [User]
    getUserById(_id:String!): User
}
type Mutation {
    createUser(
        nombre: String!
        apellido: String!
        identificacion: String!
        estado: String
        correo: String!
        contrasena: String!
        Rol: ID!
        ): User

    login(
        correo: String!, 
        contrasena: String!
        ): User

    updateUser(
        _id: ID!
        nombre: String
        apellido: String
        identificacion: String
        estado: String
        correo: String
        contrasena: String
        Rol: ID
        ): User
    deleteUser(
        _id: ID!
        nombre: String
        apellido: String
        identificacion: String
        estado: String
        correo: String
        contrasena: String
        ): User
}
`;

module.exports = {userType}
