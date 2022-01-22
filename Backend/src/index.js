const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const { resolvers } = require("./resolvers");
const { types } = require("./types");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs: types,
  resolvers: resolvers,
});

const Rol = require("../src/models/Role");
const Permiso = require("../src/models/Permiso");

function initial() {
  Rol.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Rol({
        nombre: "estudiante",
      }).save(async (err, estudianteRol) => {
        if (err) {
          console.log("error", err);
        }

        let permisos = await Permiso.insertMany([
          {
            nombre: "Añadir Inscripcion a proyecto",
            accion: "CreateInscription",
            rol: estudianteRol._id,
          },
          {
            nombre: "CRUD Avances",
            accion: "goToAdvances",
            rol: estudianteRol._id,
          },
        ]);

        await Rol.findByIdAndUpdate(estudianteRol._id, {
            $set: {
                "permisos": permisos
            }
         })

        console.log("added 'estudiante' to roles collection");
      });

      new Rol({
        nombre: "lider",
      }).save(async (err, liderRol) => {
        if (err) {
          console.log("error", err);
        }

        let permisos = await Permiso.insertMany([
          {
            nombre: "Crear proyecto",
            accion: "createProjects",
            rol: liderRol._id,
          },
          {
            nombre: "Editar proyecto",
            accion: "changeProject",
            rol: liderRol._id,
          },
          {
            nombre: "Borrar proyecto",
            accion: "deleteProjects",
            rol: liderRol._id,
          },
          {
            nombre: "Editar Observacion",
            accion: "editObservation",
            rol: liderRol._id,
          },
          {
            nombre: "Editar Estado Usuario",
            accion: "editStateUser",
            rol: liderRol._id,
          },
          {
            nombre: "Editar Estado Inscripcion",
            accion: "editStateInscription",
            rol: liderRol._id,
          },
        ]);

        await Rol.findByIdAndUpdate(liderRol._id, {
            $set: {
                "permisos": permisos
            }
         })

        console.log("added 'lider' to roles collection");
      });

      new Rol({
        nombre: "administrador",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'administrador' to roles collection");
      });

      //administrador can make anything only don`t edit or delete rol
      //lider
      // 1. create projects
      // 2. edit projects
      // 3. delete projects
      // 4. observations
      // 5. state of the user (pending)
      // 6. edit the user data
      // 7. the incription is pending when a user create that

      //estudiante
      //1. list project(only can see the projects)
      //2. add inscription to project
      //3. CRUD advances
      //4. edit user information
    }
  });
}

mongoose.connect(
  "mongodb+srv://proyecto:proyectoCADEL@cluster0.6zaxb.mongodb.net/graphi",
  async () => {
    initial();

    app.listen(5010, async () => {
      await server.start();
      server.applyMiddleware({ app });
      console.log("servidor inicializado en puerto 5010");
    });
  }
);
