import React from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import routes from "../helpers/routes";
import history from "../history";

export default function Navigation() {
  const isLogged = localStorage.getItem("isLogged");
  const style = {
    cursor: "pointer"
  }

 function logout(){
  localStorage.removeItem("isLogged")
  localStorage.removeItem("nombre")
  localStorage.removeItem("Rol")
  history.push ('/')
  window.location.reload()
 }

  return (
    <div className="row">
      <div className="col-12">
        <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
          <Navbar.Brand as={NavLink} to={routes.home}>
            Gestor de tareas
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {isLogged ? (
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to={routes.projects}>
                  Proyectos
                </Nav.Link>
                <Nav.Link as={NavLink} to={routes.avances}>
                  Avances
                </Nav.Link>
                <NavDropdown title="Admin">
                  <NavDropdown.Item as={NavLink} to={routes.users.admin}>
                    Usuarios
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              ""
            )}
            <Nav className="mx-auto">
              {!isLogged ? (
                <Nav.Link as={NavLink} to={routes.login}>
                  Login
                </Nav.Link>
              ) : (
                <div>
                  <a className="nav-link" style={style}
                    onClick={ logout}
                  >
                    Cerrar sesión
                  </a>
                </div>
              )}

              {!isLogged ? (
                <Nav.Link as={NavLink} to={routes.register}>
                Registro
              </Nav.Link>
              ) : (
                 <Nav.Link as={NavLink} to={routes.account}>
                 Mi cuenta
               </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          <h1>Navigation</h1>
        </Navbar>
      </div>
    </div>
  );
}
