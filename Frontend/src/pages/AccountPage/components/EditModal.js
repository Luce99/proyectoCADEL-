import React, { useState } from "react";
import { Modal, Form, Alert, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import editAccountResolver from "../../../validations/editAccountResolver";
import { gql, useQuery, useMutation } from "@apollo/client";

export default function EditModal({
  isOpen,
  close,
  id,
  nombreD,
  apellidoD,
  identificacionD,
  estadoD,
  correoD,
  RolD,
}) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [estado, setEstado] = useState("");
  const [correo, setCorreo] = useState("");
  const [Rol, setRol] = useState("");
  const {
    formState: { errors, dirtyFields },
    reset,
  } = useForm({ resolver: editAccountResolver });
  const isDirty = !!Object.keys(dirtyFields).length;

  useEffect(() => {
    setNombre(nombreD);
    setApellido(apellidoD);
    setIdentificacion(identificacionD);
    setEstado(estadoD);
    setCorreo(correoD);
    setRol(RolD);
  }, [nombreD, apellidoD, identificacionD, estadoD, correoD, RolD]);

  const handleSubmit = (e) => {
    e.preventDefault();
    changeUser({
      variables: {
        id: id,
        nombre: nombre,
        apellido: apellido,
        identificacion: identificacion,
        estado: estado,
        correo: correo,
        Rol: Rol,
      },
    });
    close();
    window.location.reload()
  };

  const updateUser = gql`
    mutation updateUser(
      $id: ID!
      $nombre: String
      $apellido: String
      $identificacion: String
      $correo: String
    ) {
      updateUser(
        _id: $id
        nombre: $nombre
        apellido: $apellido
        identificacion: $identificacion
        correo: $correo
      ) {
        nombre
        apellido
        identificacion
        estado
        correo
      }
    }
  `;

  const [changeUser] = useMutation(updateUser);

  return (
    <>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                type="text"
                value={nombre}
                placeholder="Escribe un nombre"
                onChange={(evt) => setNombre(evt.target.value)}
              />
              {errors.nombre && (
                <Form.Text>
                  <Alert variant="danger">{errors.nombre.message}</Alert>
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escribe un apellido"
                name="apellido"
                value={apellido}
                onChange={(evt) => setApellido(evt.target.value)}
              />
              {errors.apellido && (
                <Form.Text>
                  <Alert variant="danger">{errors.apellido.message}</Alert>
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Identificacion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escribe la identificación"
                name="identificacion"
                value={identificacion}
                onChange={(evt) => setIdentificacion(evt.target.value)}
              />
              {errors.identificacion && (
                <Form.Text>
                  <Alert variant="danger">
                    {errors.identificacion.message}
                  </Alert>
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escribe un correo"
                name="correo"
                value={correo}
                onChange={(evt) => setCorreo(evt.target.value)}
              />
              {errors.correo && (
                <Form.Text>
                  <Alert variant="danger">{errors.correo.message}</Alert>
                </Form.Text>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Actualizar mi cuenta
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
