import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@material-ui/core";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";
import useModal from "../../hooks/useModal";
import EditModalUsers from "../Modales/EditModalUsers";
// Cambios
import { gql, useMutation, useQuery } from "@apollo/client";

export default function UsersPage() {
  
  const [
    isOpenEditModalUsers,
    OpenEditModalUsers,
    closeEditModalUsers,
  ] = useModal();

  const [id, setId] = useState();
  const [estado, setStatus] = useState("");


  const GetUsuario = gql`
    query getusers {
      getUsers {
        _id
        nombre
        apellido
        estado
        Rol {
          nombre
        }
      }
    }
  `;
 //Eliminar

 const deleteUser = gql`
 mutation Mutation($id: ID!) {
  deleteUser(_id: $id) {
    _id
    nombre
    apellido
    identificacion
    estado
    correo
    contrasena
    Rol {
      nombre
    }
    projects {
      nombre
    }
  }
}`;

const [deleteUsers] = useMutation(deleteUser, {
  refetchQueries: [{query: GetUsuario}],
});

const DeleteUser = async (id) =>{
  var respuesta = window.confirm("¿Estas seguro que deseas eliminarlo?");

  if (respuesta == true) {
    return true && (await deleteUsers({ variables: { id } }));
  } else {
    return false;
  }
};

  //Editar
  function toggle(users) {
    setId(users._id)
    setStatus(users.estado)
    OpenEditModalUsers();
  }

  const { data, loading } = useQuery(GetUsuario);
  // if (error) return <span style={{color: 'red'}}>{error}</span>
  const rol = JSON.parse(localStorage.getItem("rol"));

  return (
    <>
    <div className="main_container">
      <h1>Gestión de Usuarios</h1>
      <div style={{ height: "800px", width: "80vw" }} className="principal-box">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Editar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow></TableRow>
              ) : (
                <>
                  {data &&
                    data.getUsers.map((users) => (
                      <TableRow key={users._id}>
                        <TableCell>{users._id}</TableCell>
                        <TableCell>{users.Rol.nombre}</TableCell>
                        <TableCell>{users.nombre}</TableCell>
                        <TableCell>{users.apellido}</TableCell>
                        <TableCell>{users.estado}</TableCell>
                        <TableCell><Button
          startIcon={<EditIcon/>}
          variant="contained"
          color="primary"
          style={{ fontSize: 12}}
          onClick={()=> { 
            if (
              rol.permisos.some(
                (p) => p.accion === "editStateUser"
              )
            ) { toggle(users)} else {
              alert(
                "no estas autorizado para realizar esta operacion"
              );
            }}}
        >
          Editar usuario
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
          if (
          rol.permisos.some(
          (p) => p.accion === "deleteUser"))
          {DeleteUser(users._id)} else {
          alert(
          "no estas autorizado para realizar esta operacion");}}}>
          Borrar
          </Button>
        </TableCell>
                      </TableRow>
                    ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
    </div>
        <EditModalUsers 
        isOpen= {isOpenEditModalUsers}
        close= {closeEditModalUsers}
        id= {id}
        estadoD={estado}/>
    </>
  );
};
