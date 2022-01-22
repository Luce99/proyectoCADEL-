import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Container, Row, Button, Table } from "react-bootstrap";
import EditModalProjects from "./Modales/EditModalProjects";
import useModal from "../hooks/useModal";
import routes from "../helpers/routes";
import { Link } from "react-router-dom";

export default function ProjectsPage() {

  //Modal
  const [
    isOpenEditModalProjects,
    OpenEditModalProjects,
    closeEditModalProjects,
  ] = useModal();

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [objetivosGenerales, setObjetivosGenerales] = useState("");
  const [objetivosEspecificos, setObjetivosEspecificos] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaTerminacion, setFechaTerminacion] = useState("");
  var   [presupuesto, setPresupuesto] = useState(0);
  const [owner, setOwner] = useState("");
  const [estadoProyecto, setEstadoProyecto] = useState("");
  const [faseProyecto, setFaseProyecto] = useState("");

  const getProjects = gql`
    query getProjects {
  getProjects {
    _id
    nombre
    objetivosGenerales
    objetivosEspecificos
    fechaInicio
    fechaTerminacion
    estadoProyecto
    faseProyecto
    presupuesto
    owner
  }
}
  `;

  const createProject = gql`
mutation createProject($nombre: String!, $objetivosGenerales: String!, $objetivosEspecificos: String!, $fechaInicio: DateTime!, $fechaTerminacion: DateTime!,  $presupuesto: Float!, $owner: ID!) {
  createProject(nombre: $nombre, objetivosGenerales: $objetivosGenerales, objetivosEspecificos: $objetivosEspecificos, fechaInicio: $fechaInicio, fechaTerminacion: $fechaTerminacion, presupuesto: $presupuesto, owner: $owner) {
    _id
    nombre
    objetivosGenerales
    objetivosEspecificos
    fechaInicio
    fechaTerminacion
    presupuesto
    owner
  }
}`;

  //eliminar
  const deleteProject = gql`
  mutation deleteProject($id: ID!) {
  deleteProject(_id: $id) {
    _id
    nombre
    objetivosGenerales
    objetivosEspecificos
    fechaInicio
    fechaTerminacion
    estadoProyecto
    faseProyecto
    presupuesto
    owner
  }
}`


  const [deleteProjects] = useMutation(deleteProject, {
    refetchQueries: [{ query: getProjects }]
  })

  const DeleteProjects = async (id) => {

    var respuesta = window.confirm("¿Estas seguro que deseas eliminarlo?");

    if (respuesta == true) {
      return true && await deleteProjects({ variables: { id } });
    }
    else {
      return false;
    }
  }




  //crear
  var [index] = useState(0);

  const [createProjects] = useMutation(createProject, {
    refetchQueries: [{ query: getProjects }],
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(nombre, objetivosGenerales, objetivosEspecificos, fechaInicio, fechaTerminacion, presupuesto, owner)
    presupuesto = parseFloat(presupuesto)
    createProjects({ variables: { nombre, objetivosGenerales, objetivosEspecificos, 
    fechaInicio, fechaTerminacion, presupuesto, owner } });


    setNombre("");
    setObjetivosGenerales("");
    setObjetivosEspecificos("");
    setFechaInicio("");
    setFechaTerminacion("");
    setPresupuesto(0);
    setOwner("");

  };
  function toggle(projects) {
    setId(projects._id);
    setNombre(projects.nombre);
    setObjetivosGenerales(projects.objetivosGenerales);
    setObjetivosEspecificos(projects.objetivosEspecificos);
    setFechaInicio(projects.fechaInicio);
    setFechaTerminacion(projects.fechaTerminacion);
    setPresupuesto(projects.presupuesto);
    setEstadoProyecto(projects.estadoProyecto);
    setFaseProyecto(projects.faseProyecto);
    setOwner(projects.owner);
    OpenEditModalProjects();
  }

  //listar
  const { data, error, loading } = useQuery(getProjects);
  if (error) return <span style={{ color: "red" }}>{error}</span>;

  return (
    <>
      <Container>
        <div>
          <Row>
            <h1>Nuevo Proyecto</h1>
            <form onSubmit={handleSubmit}>
              <input
                id={+true}
                placeholder="Ingresa el nombre del proyecto"
                value={nombre}
                onChange={(evt) => setNombre(evt.target.value)}
              />
              <input
                id={+true}
                placeholder="Ingresa los objetivos generales"
                value={objetivosGenerales}
                onChange={(evt) => setObjetivosGenerales(evt.target.value)}
              />
              <input
                id={+true}
                placeholder="Ingresa los objetivos especificos"
                value={objetivosEspecificos}
                onChange={(evt) => setObjetivosEspecificos(evt.target.value)}
              />
              <input
                id={+true}
                type="date"
                placeholder="Ingresa la fecha de inicio"
                value={fechaInicio}
                onChange={(evt) => setFechaInicio(evt.target.value)}
              ></input>
              <input
                id={+true}
                type="date"
                placeholder="Ingresa la fecha de terminación"
                value={fechaTerminacion}
                onChange={(evt) => setFechaTerminacion(evt.target.value)}
              ></input>
              <input
                id={+true}
                type="number"
                placeholder="Ingresa el presupuesto"
                value={presupuesto}
                onChange={(evt) => setPresupuesto(evt.target.value)}
              />
              <input
                id={+true}
                placeholder="Ingresa el id del dueño del proyecto"
                value={owner}
                onChange={(evt) => setOwner(evt.target.value)}
              />
              <button>Agregar Proyecto</button>
            </form>
          </Row>
          <div >
            <Table>
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>objetivosGenerales</th>
                  <th>objetivosEspecificos</th>
                  <th>Fecha inicio</th>
                  <th>Fecha Terminación</th>
                  <th>Presupuesto</th>
                  <th>Estado Proyecto</th>
                  <th>Fase Proyecto</th>
                  <th>Dueño proyecto</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr></tr>
                ) : (
                  <>
                    {data &&
                      data.getProjects.map((projects) => (
                        <tr key={projects._id}>
                          <td>{(index = index + 1)}</td>
                          <td>{projects._id}</td>
                          <td>{projects.nombre}</td>
                          <td>{projects.objetivosGenerales}</td>
                          <td>{projects.objetivosEspecificos}</td>
                          <td>{projects.fechaInicio}</td>
                          <td>{projects.fechaTerminacion}</td>
                          <td>{projects.presupuesto}</td>
                          <td>{projects.estadoProyecto}</td>
                          <td>{projects.faseProyecto}</td>
                          <td>{projects.owner}</td>
                          <td>
                            <div className="btn-group">
                              <Button color="warning" as={Link} to={routes.InscriptionPage} >
                                Inscribirme
                              </Button>
                              <Button color="warning" as={Link} to={routes.avances} >
                                Avances
                              </Button>
                              <Button
                                color="primary"
                                onClick={() => toggle(projects)}
                              >
                                Editar
                              </Button>
                              <Button
                                color="primary"
                                onClick={() => DeleteProjects(projects._id)}
                              >
                                Borrar
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
      <EditModalProjects
        isOpen={isOpenEditModalProjects}
        close={closeEditModalProjects}
        id={id}
        nombreD={nombre}
        objetivosGeneralesD={objetivosGenerales}
        objetivosEspecificosD={objetivosEspecificos}
        fechaInicioD={fechaInicio}
        fechaTerminacionD={fechaTerminacion}
        estadoProyectoD={estadoProyecto}
        faseProyectoD={faseProyecto}
        presupuestoD={presupuesto}
        ownerD={owner}

      />
    </>
  );
}

