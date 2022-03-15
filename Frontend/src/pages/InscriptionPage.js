import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Container, Row, Button, Table } from "react-bootstrap";
import EditModalInscription from "./Modales/EditModalInscription";
import useModal from "../hooks/useModal";

export default function InscriptionPage() {

  //Modal
  const [
    isOpenEditModalInscription,
    OpenEditModalInscription,
    closeEditModalInscription,
  ] = useModal();

  const [id, setId] = useState();
  const [estadoInscripcion, setEstadoInscripcion] = useState();
  const [fechaIngreso, setFechaIngreso] = useState();
  const [fechaEgreso, setFechaEgreso] = useState();
  const [estudiante, setEstudiante] = useState();
  const [projects, setProjects] = useState();

  const GetInscriptions = gql`
    query getinsciption {
      getInscripcion {
        _id
        estadoInscripcion
        fechaIngreso
        fechaEgreso
        estudiante
        projects
      }
    }
  `;

  const CreateInscription = gql`
    mutation createInscription($estudiante: String!, $projects: String!) {
      createInscripcion(estudiante: $estudiante, projects: $projects) {
        _id
        estadoInscripcion
        fechaIngreso
        fechaEgreso
        estudiante
        projects
      }
    }
  `;

  //eliminar
  const DeleteInscripcion = gql`
    mutation deleteInscripcion($id: String!) {
      deleteInscripcion(_id: $id) {
        _id
      }
  }`


  const [deleteInscripcion]= useMutation(DeleteInscripcion, {
    refetchQueries: [ { query: GetInscriptions}]
  })

  const deleteInscription = async (id) => {

    var respuesta = window.confirm("¿Estas seguro que deseas eliminarlo?");

    if (respuesta == true)
    {
        return true && await deleteInscripcion({variables:{id}});
    }
    else 
    {
        return false;
    }
  } 
  //crear
  var [index] = useState(0);

  const [createInscripcion] = useMutation(CreateInscription, {
    refetchQueries: [{ query: GetInscriptions }],
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (estado === "Autorizado"){
    if (
      rol.permisos.some(
        (p) => p.accion === "CreateInscription"
        )
        ) {
    createInscripcion({ variables: { estudiante, projects } });
  } else {
    alert(
      "no estas autorizado para realizar esta operacion"
    );
  }}else {
    alert(
      "no estas autorizado para realizar esta operacion"
    );
  }
    setEstudiante("");
    setProjects("");

    window.close();
  };
  function toggle(inscription) {
    setId(inscription._id);
    setEstadoInscripcion(inscription.estadoInscripcion);
    setFechaIngreso(inscription.fechaIngreso);
    setFechaEgreso(inscription.fechaEgreso);
    setEstudiante(inscription.estudiante);
    setProjects(inscription.projects);
    OpenEditModalInscription();
  }

  //listar
  const { data, error, loading } = useQuery(GetInscriptions);
  if (error) return <span style={{ color: "red" }}>{error}</span>;

  const rol = JSON.parse(localStorage.getItem("Rol"));
  const estado = (localStorage.getItem("estado"));
  
  return (
    <>
      <Container>
        <div>
          <Row>
            <h1>Nueva inscripción</h1>
            <form onSubmit={handleSubmit}>
              <input
                id={+true}
                placeholder="Ingresa el id del estudiante"
                value={estudiante}
                onChange={(evt) => setEstudiante(evt.target.value)}
              />
              <input
                id={+true}
                placeholder="Ingresa el id del proyecto"
                value={projects}
                onChange={(evt) => setProjects(evt.target.value)}
              />
              <Button variant="success" type="submit"> Enviar</Button>
            </form>
          </Row>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <thead>
              <tr>
                <th>Index</th>
                <th>Id</th>
                <th>Estado inscripción</th>
                <th>Fecha ingreso</th>
                <th>Fecha egreso</th>
                <th>Estudiante</th>
                <th>Proyectos</th>
                <th>Funciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr></tr>
              ) : (
                <>
                  {data &&
                    data.getInscripcion.map((inscription) => (
                      <tr key={inscription._id}>
                        <td>{(index = index + 1)}</td>
                        <td>{inscription._id}</td>
                        <td>{inscription.estadoInscripcion}</td>
                        <td>{new Date(inscription.fechaIngreso).toLocaleString().split(",")[0]}</td>
                        <td>{new Date(inscription.fechaEgreso).toLocaleString().split(",")[0]}</td>
                        <td>{inscription.estudiante}</td>
                        <td>{inscription.projects}</td>
                        <td>
                          <Button
                            color="primary"
                            onClick={() => { 
                              if (estado === "Autorizado"){
                              if (
                                rol.permisos.some(
                                  (p) => p.accion === "editStateInscription"
                                )
                              ) {toggle(inscription)} else {
                                alert(
                                  "no estas autorizado para realizar esta operacion"
                                );
                              }}else {
                                alert(
                                  "no estas autorizado para realizar esta operacion"
                                );
                              } }}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => {
                              if (estado === "Autorizado"){
                              if (
                                rol.permisos.some(
                                  (p) => p.accion === "eliminarInscription"
                                )
                              ) {deleteInscription(inscription._id)} else {
                                alert(
                                  "no estas autorizado para realizar esta operacion"
                                );
                              }}else {
                                alert(
                                  "no estas autorizado para realizar esta operacion"
                                );
                              }}}
                          >
                            Borrar
                          </Button>
                        </td>
                      </tr>
                    ))}
                </>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
      <EditModalInscription
        isOpen={isOpenEditModalInscription}
        close={closeEditModalInscription}
        id={id}
        estadoInscripcionD={estadoInscripcion}
        fechaIngresoD={fechaIngreso}
        fechaEgresoD={fechaEgreso}
        estudiante={estudiante}
        projects={projects}
      />
    </>
  );
}
