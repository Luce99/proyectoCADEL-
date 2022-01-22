import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Button, FormControl } from "react-bootstrap";
import { gql } from "@apollo/client";
import { Modal, ModalBody, FormGroup, Form } from "react-bootstrap";

export default function EditModalAvances({
  isOpen,
  close,
  id,
  descripcionD,
  fechaAvanceD, 
  observacionesLiderD,
  estudiante,
  projects,
}) {
  const [fechaAvance, setFechaAvance] = useState();
  const [observacionesLider, setObservacionesLider] = useState();
  const [descripcion, setDescripcion] = useState();

  useEffect(() => {
    setFechaAvance(fechaAvanceD ? fechaAvanceD.substring(0,10) : '');
    setObservacionesLider(observacionesLiderD);
    setDescripcion(descripcionD);
  }, [fechaAvanceD, observacionesLiderD, descripcionD])

  const handleSubmit = (e) => {
    e.preventDefault();
    changeAvance({ variables : { id: id, fechaAvance: new Date(fechaAvance).toISOString(), observacionesLider: observacionesLider, descripcion: descripcion }});
    close()
  };

 const UpdateAvance = gql`
 mutation updateAvance($id: ID!, $fechaAvance: DateTime, $observacionesLider: String, $descripcion: String) {
  updateAvances(_id: $id, fechaAvance: $fechaAvance, observacionesLider: $observacionesLider, descripcion: $descripcion ) {
    _id
    fechaAvance
    descripcion
    observacionesLider
    estudiante
    projects
  }
}
  `;

  const [changeAvance] = useMutation(UpdateAvance);

  return (
    <>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header closeButton>
          <div>
            <h2>Editar Avance</h2>
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
              <label>Fecha avance:</label>
              <FormControl
                id={+true}
                className="form-control"
                name="fechaAvance"
                type="date"
                value={fechaAvance}
                onChange={(evt) => setFechaAvance(evt.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup>
              <label>Descripción:</label>
              <FormControl
                id={+true}
                className="form-control"
                name="descripcion"
                type="text"
                value={descripcion}
                onChange={(evt) => setDescripcion(evt.target.value)}
              ></FormControl>
            </FormGroup>
            <FormGroup>
              <label>Observaciones Lider:</label>
              <FormControl
                id={+true}
                className="form-control"
                name="observacionesLider"
                type="text"
                value={observacionesLider}
                onChange={(evt) => setObservacionesLider(evt.target.value)}
              ></FormControl>
            </FormGroup>

            <FormGroup>
              <label>Estudiante:</label>
              <FormControl
                id={+true}
                className="form-control"
                name="estudiante"
                value={estudiante}
                readOnly
                type="text"
              ></FormControl>
            </FormGroup>

            <FormGroup>
              <label>Proyectos:</label>
              <FormControl
                id={+true}
                className="form-control"
                name="projects"
                value={projects}
                readOnly
                type="text"
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

