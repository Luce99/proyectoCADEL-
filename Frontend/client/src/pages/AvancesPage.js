import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Container, Row, Button, Table } from "react-bootstrap";
import EditModalAvances from "./Modales/EditModalAvances";
import useModal from "../hooks/useModal";

export default function  AvancesPage() {

  //Modal
  const [
    isOpenEditModalAvances,
    OpenEditModalAvances,
    closeEditModalAvances,
  ] = useModal();

  const [id, setId] = useState();
  const [fechaAvance, setFechaAvance] = useState();
  const [descripcion, setDescripcion] = useState();
  const [observacionesLider, setObservacionesLider] = useState();
  const [estudiante, setEstudiante] = useState();
  const [projects, setProjects] = useState();

  const getAvances = gql`
    query GetAvances {
    getAvances {
    _id
    fechaAvance
    descripcion
    observacionesLider
    estudiante
    projects
  }
}
  `;

  const createAvances = gql`
    mutation createAvances($descripcion: String!, $estudiante: ID!, $projects: ID!) {
    createAvances(descripcion: $descripcion, estudiante: $estudiante, projects: $projects) {
    _id
    fechaAvance
    descripcion
    observacionesLider
    estudiante
    projects
  }
}
  `;

  //eliminar
  const delete_Avances = gql`
    mutation DeleteAvances($id: ID!) {
    deleteAvances(_id: $id) {
    _id
    fechaAvance
    descripcion
    observacionesLider
    estudiante
    projects
  }
}`


  const [deleteAvances]= useMutation(delete_Avances, {
    refetchQueries: [ { query: getAvances}]
  })

  const DeleteAvances = async (id) => {

    var respuesta = window.confirm("¿Estas seguro que deseas eliminarlo?");

    if (respuesta == true){
        return true && await deleteAvances({variables:{id}});
      }
    else {
        return false;
    }
    }
    
   
    
   
  //crear
  var [index] = useState(0);

  const [CreateAvances] = useMutation(createAvances, {
    refetchQueries: [{ query: getAvances }],
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    CreateAvances({ variables: { descripcion, estudiante, projects } });

    setDescripcion("");
    setEstudiante("");
    setProjects("");

    window.close();
  };
  function toggle(avances) {
    setId(avances._id);
    setFechaAvance(avances.fechaAvance);
    setDescripcion(avances.descripcion);
    setObservacionesLider(avances.observacionesLider);
    setEstudiante(avances.estudiante);
    setProjects(avances.projects);
    OpenEditModalAvances();
  }

  //listar
  const { data, error, loading } = useQuery(getAvances);
  if (error) return <span style={{ color: "red" }}>{error}</span>;

  return (
    <>
      <Container>
        <div>
          <Row>
            <h1>Nuevo Avance</h1>
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
              <input
                id={+true}
                placeholder="Ingresa una descripción"
                value={descripcion}
                onChange={(evt) => setDescripcion(evt.target.value)}
              />
              <button color="success">Agregar avance</button>
            </form>
          </Row>
          <Table>
            <thead>
              <tr>
                <th>Index</th>
                <th>Id</th>
                <th>Fecha avance</th>
                <th>Descripción</th>
                <th>Observaciones lider</th>
                <th>Estudiante</th>
                <th>Proyectos</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr></tr>
              ) : (
                <>
                  {data &&
                    data.getAvances.map((avances) => (
                      <tr key={avances._id}>
                        <td>{(index = index + 1)}</td>
                        <td>{avances._id}</td>
                        <td>{avances.fechaAvance}</td>
                        <td>{avances.descripcion}</td>
                        <td>{avances.observacionesLider}</td>
                        <td>{avances.estudiante}</td>
                        <td>{avances.projects}</td>
                        <td>
                          <Button
                            color="primary"
                            onClick={() => toggle(avances)}
                          >
                            Editar
                          </Button>
                          <Button
                            color="primary"
                            onClick={() => DeleteAvances(avances._id)}
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
      <EditModalAvances
        isOpen={isOpenEditModalAvances}
        close={closeEditModalAvances}
        id={id}
        fechaAvanceD={fechaAvance}
        descripcionD={descripcion}
        observacionesLiderD={observacionesLider}
        estudiante={estudiante}
        projects={projects}
      />
    </>
  );
}
