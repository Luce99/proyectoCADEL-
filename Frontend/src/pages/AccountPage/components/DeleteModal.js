import React from 'react'
import {Modal, Alert, Button} from 'react-bootstrap'
import {gql, useMutation} from "@apollo/client"
import history from '../../../history'

export default function DeleteModal({isOpen, close}){
    
    const id = localStorage.getItem("id")

    function logout(){
        localStorage.removeItem("isLogged")
        localStorage.removeItem("nombre")
        localStorage.removeItem("Rol")
        localStorage.removeItem("id")
        history.push ('/')
        window.location.reload()
       }

    const deleteUser = gql `
    mutation deleteUser($id: ID!) {
    deleteUser(_id: $id) {
    nombre
    apellido
    identificacion
    estado
    correo
  }
}`
    const [deleteUsers] = useMutation(deleteUser)

    const DeleteUser = async (id) => {
        var respuesta = window.confirm("¿Estas seguro que deseas eliminarlo?");

    if (respuesta == true) {
      return true && (await deleteUsers({ variables: { id } }));
    } else {
      return false;
    }
  };

    const handleDelete = async() => {
        var result = await DeleteUser(id)
        if (result){
        logout()
    }}

    return (
        <Modal show={isOpen} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar cuenta</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="danger">
                    ¿Estas seguro que deseas eliminar permanentemente tu cuenta?
                    <b>perderás toda tu información</b>
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>Cancelar</Button>
                <Button variant="danger" onClick= {handleDelete}>Eliminar mi cuenta</Button>
            </Modal.Footer>
        </Modal>
    )
}