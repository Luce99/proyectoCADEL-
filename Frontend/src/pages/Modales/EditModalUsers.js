import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Button, FormControl } from "react-bootstrap";
import { gql } from "@apollo/client";
import { Modal, ModalBody, FormGroup, Form } from "react-bootstrap";

 export default function EditModalUsers({
    isOpen,
    close,
    id,
    estadoD
 }){

    const [estado, setStatus] = useState();
 //Editar

 useEffect(()=>{
    setStatus(estadoD);
  }, [estadoD])

  const handleSubmit = (e) => {
    e.preventDefault();
    changeUser({variables: { id:id,
      estado: estado}})
      close()
      
  };

  const updateUser = gql`
  mutation UpdateUser($id: ID!, $estado: String) {
    updateUser(_id: $id, estado: $estado) {
      _id
      estado
    }
  }`

  const [changeUser] = useMutation(updateUser);

return (
    <>
     <Modal show={isOpen} onHide={close}>
            <Modal.Header closeButton>
              <div>
            <h1>Gestión Usuarios</h1>
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
                <Form.Label>Estado:</Form.Label>
                <select
              className="form-control"
              id="sel1"
              name="estado"
              value={estado}
              onChange={(evt) => setStatus(evt.target.value)}>
                <option value={"Pendiente"}>Pendiente</option>
                <option value={"No autorizado"}>No autorizado</option>
                <option value={"Autorizado"}>Autorizado</option>
              </select>
            
            </Form>
            </ModalBody>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={ handleSubmit}
              >
                Aceptar
              </Button>
              <Button
                variant="danger"
                onClick={close}
              >
                Cancelar
              </Button>
              </Modal.Footer>
        </Modal>
    </>
)
}