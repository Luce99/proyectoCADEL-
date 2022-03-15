const {gql} = require("apollo-server-express")


const rolType = gql`

type Rol {
    nombre: String!
    permisos: [Permiso!]
}

type Permiso {
    nombre: String
    accion: String
}

type Query {
    getRoles: [Rol]
}

`;

module.exports = {rolType}
