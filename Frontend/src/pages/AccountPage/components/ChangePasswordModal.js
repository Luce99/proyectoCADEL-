import { gql,useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { useEffect } from 'react';
import {Modal, Form, Alert, Button} from 'react-bootstrap'

export default function ChangePasswordModal({isOpen, close, id, contrasenaD}){

    const [contrasena, setContrasena]= useState("")


    useEffect(() =>{
        setContrasena(contrasenaD);
    }, [contrasenaD])

    const handleSubmit = (e) => {
        e.preventDefault();
        changePassword({
          variables: {
            id: id,
            contrasena: contrasena,
          },
        });
        close();
        window.location.reload()
      };

      const updateUser = gql`
      mutation UpdateUser($id: ID!, $contrasena: String) {
      updateUser(_id: $id, contrasena: $contrasena) {
      _id
      contrasena
  }
}`

    const [changePassword] = useMutation(updateUser);

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Cambiar contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nueva contraseña</Form.Label>
                        <Form.Control 
                            placeholder="Escribe una nueva contraseña"
                            type='password'
                            name="contrasena"
                            type="text"
                            value={contrasena}
                            onChange={(evt) => setContrasena(evt.target.value)}
                      />
                    </Form.Group>
                </Form> 
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>Cancelar</Button>
                <Button variant="primary" onClick= {handleSubmit}>Actualizar contraseña</Button>
            </Modal.Footer>
        </Modal>
    )
}