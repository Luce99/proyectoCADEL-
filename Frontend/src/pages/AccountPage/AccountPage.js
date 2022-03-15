import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import DeleteModal from "./components/DeleteModal";
import ChangePasswordModal from "./components/ChangePasswordModal";
import useModal from "../../hooks/useModal";
import EditModal from "./components/EditModal";
import { gql, useMutation, useQuery } from "@apollo/client";

export default function AccountPage() {
  const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] = useModal();
  const [
    isOpenChangePasswordModal,
    openChangePasswordModal,
    closeChangePasswordModal,
  ] = useModal();
  const [isOpenEditModal, openEditModal, closeEditModal] = useModal();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [estado, setEstado] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const id = localStorage.getItem("id");

  const getUserById = gql`
    query getUserById($id: String!) {
      getUserById(_id: $id) {
        _id
        nombre
        apellido
        identificacion
        estado
        correo
        Rol {
          nombre
        }
      }
    }
  `;

  //Editar
  function toggle(users) {
    setNombre(users.nombre);
    setApellido(users.apellido);
    setIdentificacion(users.identificacion);
    setEstado(users.estado);
    setCorreo(users.correo);
    openEditModal();
  }
  //Listar
  const { data, error, loading } = useQuery(getUserById, { variables: { id } });

  return (
    <>
      <Container>
        <Row className="mt-4">
          <Col xs={12} className="text-center">
            <img
              src="/img/male_avatar.svg"
              alt="profile"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Col>
          <Col className="mt-4">
            {data ? (
              <Card style={{ maxWidth: "360px" }} className="mx-auto p-4 ">
                <p className="text-center">
                  <b>Nombre: </b>
                  {data.getUserById.nombre}
                </p>
                <p className="text-center">
                  <b>Apellido: </b>
                  {data.getUserById.apellido}
                </p>
                <p className="text-center">
                  <b>Identificacion: </b>
                  {data.getUserById.identificacion}
                </p>
                <p className="text-center">
                  <b>Correo: </b>
                  {data.getUserById.correo}
                </p>
                <p className="text-center">
                  <b>Rol: </b>
                  {data.getUserById.Rol.nombre}
                </p>
                <p className="text-center">
                  <b>Estado: </b>
                  {data.getUserById.estado}
                </p>
                <Button variant="warning" onClick={()=>toggle(data.getUserById)}>
                  Editar cuenta
                </Button>
                <Button
                  variant="link"
                  className="mt-1"
                  onClick={openChangePasswordModal}
                >
                  Cambiar contraseña
                </Button>
                <Button
                  variant="link"
                  className="mt-3 text-danger"
                  onClick={openDeleteModal}
                >
                  Eliminar cuenta
                </Button>
              </Card>
            ) : (
              <span>error</span>
            )}
          </Col>
        </Row>
      </Container>
      <DeleteModal 
      isOpen={isOpenDeleteModal} 
      close={closeDeleteModal}
      id={id} />
      <ChangePasswordModal
        isOpen={isOpenChangePasswordModal}
        close={closeChangePasswordModal}
        id= {id}
        contrasenaD={contrasena}
      />
      <EditModal isOpen={isOpenEditModal} close={closeEditModal}
      id={id}
      nombreD={nombre}
      apellidoD={apellido}
      identificacionD= {identificacion}
      estadoD={estado}
      correoD={correo}
       />
    </>
  );
}
