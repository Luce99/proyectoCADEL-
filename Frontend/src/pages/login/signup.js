import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import routes from "../../helpers/routes";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import history from "../../history"

export default function Signup() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [Rol, setRol] = useState("");

  //crear
  const createUser = gql`
    mutation Mutation(
      $nombre: String!
      $apellido: String!
      $identificacion: String!
      $correo: String!
      $contrasena: String!
      $Rol: ID!
    ) {
      createUser(
        nombre: $nombre
        apellido: $apellido
        identificacion: $identificacion
        correo: $correo
        contrasena: $contrasena
        Rol: $Rol
      ) {
        _id
        nombre
        apellido
        Rol {
          nombre
          permisos {
            nombre
            accion
          }
        }
      }
    }
  `;

  const [CreateUser] = useMutation(createUser);
  const handleSubmit = async(e) => {
    e.preventDefault();

   var {data, error} = await CreateUser({
      variables: { nombre, apellido, identificacion, correo, contrasena, Rol },
    });

    if (data){
      console.log(data)
      localStorage.setItem("isLogged", true);
      localStorage.setItem("Rol", JSON.stringify(data.createUser.Rol));
      localStorage.setItem("nombre", data.createUser.nombre + data.createUser.apellido);
      localStorage.setItem("id", data.createUser._id);
         history.push ('/projects')
         window.location.reload()
        
    }
    else {
      console.log("Error al registrar")
    }
    setNombre("");
    setApellido("");
    setIdentificacion("");
    setCorreo("");
    setContrasena("");
    setRol("");
  };
  return (
    <div>
      <Card style={{ width: "20rem" }}>
        <Card.Header>
          {" "}
          <h4>Proyecto CADEL - Registro</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicNombre">
              <Form.Label>Nombres</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tus nombres"
                value={nombre}
                onChange={(evt) => setNombre(evt.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicApellido">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tus apellidos"
                value={apellido}
                onChange={(evt) => setApellido(evt.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicId">
              <Form.Label>Identificación</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu número de identificación"
                value={identificacion}
                onChange={(evt) => setIdentificacion(evt.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                value={correo}
                onChange={(evt) => setCorreo(evt.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={contrasena}
                onChange={(evt) => setContrasena(evt.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEstado">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Estado"
                defaultValue="Pendiente"
              />
            </Form.Group>
            <Form.Label>Rol</Form.Label>
            <select
              className="form-control"
              id="sel1"
              value={Rol}
              onChange={(evt) => setRol(evt.target.value)}
            >
              <option value={"61f6a6a1a7f6af818d6bfdae"}> Estudiante</option>
              <option value={"61f6a6a1a7f6af818d6bfdaf"}> Lider</option>
              <option value={"61f6a6a1a7f6af818d6bfdb0"}>Administrador</option>
            </select>

            <Button variant="success" type="submit">
              Enviar
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer>
          <p className="registro text-center">
            ¿Tienes cuenta?
            <Button as={Link} to={routes.login} className="ml-1">
              {" "}
              inicia sesión{" "}
            </Button>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
}
