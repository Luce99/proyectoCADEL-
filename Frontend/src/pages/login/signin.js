import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import routes from "../../helpers/routes";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import history from "../../history"

export default function ({ handleClick }) {
  const [correo, setCorreo] = useState();
  const [contrasena, setContrasena] = useState();

  const login = gql`
    mutation login($correo: String!, $contrasena: String!) {
      login(correo: $correo, contrasena: $contrasena) {
        _id
        nombre
        apellido
        identificacion
        estado
        correo
        contrasena
        Rol {
          nombre
          permisos {
            nombre
            accion
          }
        }
        projects {
          nombre
        }
      }
    }
  `;

  const [dispatchLogin] = useMutation(login);

  const handleSubmit = async (e) => {
    e.preventDefault();

    var { data, error, loading } = await dispatchLogin({
      variables: { correo, contrasena },
    });

    if (data) {
      localStorage.setItem("isLogged", true);
      localStorage.setItem("Rol", JSON.stringify(data.login.Rol));
      localStorage.setItem("nombre", data.login.nombre + data.login.apellido);
      localStorage.setItem("id", data.login._id);
      localStorage.setItem("estado", data.login.estado);
      setCorreo("");
      setContrasena("");
      history.push ('/')
      window.location.reload()
      
    } else {
       alert(error);
    }
  };

  return (
    <div className="contenedor">
      <Card style={{ width: "18rem" }}>
        <Card.Header>
          {" "}
          <h4>Proyecto CADEL</h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                onChange={(evt) => setCorreo(evt.target.value)}
                value={correo}
                type="email"
                placeholder="Ingresa tu correo"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contrase??a</Form.Label>
              <Form.Control
                type="password"
                onChange={(evt) => setContrasena(evt.target.value)}
                value={contrasena}
                placeholder="Ingresa tu contrase??a"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer>
          <p className="registro text-center">
            ??No tienes cuenta?{" "}
            <Button as={Link} to={routes.register} className="ml-1">
              {" "}
              Registate{" "}
            </Button>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
}
