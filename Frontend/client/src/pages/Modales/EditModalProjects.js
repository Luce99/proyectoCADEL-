import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Button, FormControl } from "react-bootstrap";
import { gql } from "@apollo/client";
import { Modal, ModalBody, FormGroup, Form } from "react-bootstrap";

export default function EditModalProjects({
  isOpen,
  close,
  id,
  nombreD,
  objetivosGeneralesD,
  objetivosEspecificosD,
  fechaInicioD,
  fechaTerminacionD,
  estadoProyectoD,
  faseProyectoD,
  presupuestoD,
  ownerD,
}) {
  const [nombre, setNombre] = useState("");
  const [objetivosGenerales, setObjetivosGenerales] = useState("");
  const [objetivosEspecificos, setObjetivosEspecificos] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaTerminacion, setFechaTerminacion] = useState("");
  var [presupuesto, setPresupuesto] = useState(0);
  const [owner, setOwner] = useState("");
  const [estadoProyecto, setEstadoProyecto] = useState("");
  const [faseProyecto, setFaseProyecto] = useState("");

  useEffect(() => {
    setNombre(nombreD);
    setObjetivosGenerales(objetivosGeneralesD);
    setObjetivosEspecificos(objetivosEspecificosD);
    setFechaInicio(fechaInicioD ? fechaInicioD.substring(0, 10) : "");
    setFechaTerminacion(
      fechaTerminacionD ? fechaTerminacionD.substring(0, 10) : ""
    );
    setPresupuesto(presupuestoD);
    setOwner(ownerD);
    setEstadoProyecto(estadoProyectoD);
    setFaseProyecto(faseProyectoD);
  }, [
    nombreD,
    objetivosGeneralesD,
    objetivosEspecificosD,
    fechaInicioD,
    fechaTerminacionD,
    presupuestoD,
    ownerD,
    estadoProyectoD,
    faseProyectoD,
  ]);

  const handleSubmit = (e) => {
    presupuesto = parseFloat(presupuesto);
    e.preventDefault();
    changeProject({
      variables: {
        id: id,
        nombre: nombre,
        objetivosGenerales: objetivosGenerales,
        objetivosEspecificos: objetivosEspecificos,
        fechaInicio: new Date(fechaInicio).toISOString(),
        fechaTerminacion: new Date(fechaTerminacion).toISOString(),
        presupuesto: presupuesto,
        owner: owner,
        estadoProyecto: estadoProyecto,
        faseProyecto: faseProyecto,
      },
    });
    close();
  };

  const updateProject = gql`
    mutation updateProject(
      $id: ID!
      $nombre: String
      $objetivosGenerales: String
      $objetivosEspecificos: String
      $fechaInicio: DateTime
      $fechaTerminacion: DateTime
      $estadoProyecto: String
      $faseProyecto: String
      $presupuesto: Float
      $owner: ID
    ) {
      updateProject(
        _id: $id
        nombre: $nombre
        objetivosGenerales: $objetivosGenerales
        objetivosEspecificos: $objetivosEspecificos
        fechaInicio: $fechaInicio
        fechaTerminacion: $fechaTerminacion
        estadoProyecto: $estadoProyecto
        faseProyecto: $faseProyecto
        presupuesto: $presupuesto
        owner: $owner
      ) {
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

  const [changeProject] = useMutation(updateProject);

  return (
    <>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header closeButton>
          <div>
            <h2>Editar proyecto</h2>
          </div>
        </Modal.Header>

        <ModalBody>
          <Form>
            <FormGroup>
              <label>Id:</label>
              <FormControl
                className="form-control"
                name="_id"
                readOnly
                type="text"
                value={id}
              ></FormControl>
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <FormControl
                id={+true}
                className="form-control"
                name="nombre"
                type="text"
                value={nombre}
                onChange={(evt) => setNombre(evt.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup>
              <label>Objetivos generales:</label>
              <FormControl
                id={+true}
                className="form-control"
                name="objetivosGenerales"
                type="text"
                value={objetivosGenerales}
                onChange={(evt) => setObjetivosGenerales(evt.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup>
              <label>Objetivos especificos:</label>
              <FormControl
                id={+true}
                className="form-control"
                name="objetivosEspecificos"
                type="text"
                value={objetivosEspecificos}
                onChange={(evt) => setObjetivosEspecificos(evt.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup>
              <label>Fecha inicio:</label>
              <FormControl
                id={+true}
                className="form-control"
                name="fechaInicio"
                type="date"
                value={fechaInicio}
                onChange={(evt) => setFechaInicio(evt.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup>
              <label>Fecha Terminación:</label>
              <FormControl
                id={+true}
                className="form-control"
                name="fechaTerminacion"
                type="date"
                value={fechaTerminacion}
                onChange={(evt) => setFechaTerminacion(evt.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup>
              <label>Estado proyecto:</label>
              <FormControl
                id={+true}
                className="form-control"
                name="estadoProyecto"
                type="text"
                value={estadoProyecto}
                onChange={(evt) => setEstadoProyecto(evt.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup>
              <label>Fase proyecto:</label>
              <FormControl
                id={+true}
                className="form-control"
                name="faseProyecto"
                type="text"
                value={faseProyecto}
                onChange={(evt) => setFaseProyecto(evt.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup>
              <label>Presupuesto:</label>
              <FormControl
                id={+true}
                className="form-control"
                name="presupuesto"
                type="number"
                value={presupuesto}
                onChange={(evt) => setPresupuesto(evt.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup>
              <label>Owner:</label>
              <FormControl
                id={+true}
                className="form-control"
                name="owner"
                type="text"
                value={owner}
                onChange={(evt) => setOwner(evt.target.value)}
              ></FormControl>
            </FormGroup>
          </Form>
        </ModalBody>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
