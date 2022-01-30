import React from 'react'
import {Container, Row, Col, Card, Button} from 'react-bootstrap'
import DeleteModal from './components/DeleteModal';
import ChangePasswordModal from './components/ChangePasswordModal';
import useModal from '../../hooks/useModal';
import EditModal from './components/EditModal';
import useAuth from '../../auth/useAuth';

export default function AccountPage(){

    const {user} = useAuth();
    const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] = useModal ();
    const [isOpenChangePasswordModal, openChangePasswordModal, closeChangePasswordModal] = useModal ();
    const [isOpenEditModal, openEditModal, closeEditModal] = useModal ();
    return (
        <>
        <Container>
            <Row className ="mt-4">
                <Col xs= {12} className="text-center">
                <img
                src="/img/male_avatar.svg"
                alt="profile"
                style={{
                    width: '200px',
                    height:'200px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                }}
                />
                </Col>
                <Col className="mt-4">
                    <Card style= {{maxWidth: '360px'}} className= "mx-auto p-4 ">
                        <p className='text-center'><b>Nombre: </b>{user}</p>
                        <p className='text-center'><b>Apellido: </b>{user}</p>
                        <p className='text-center'><b>Identificacion: </b>{user}</p>
                        <p className='text-center'><b>Correo: </b>{user}</p>
                        <p className='text-center'><b>Rol: </b>{user}</p>
                        <p className='text-center'><b>Estado: </b>{user}</p>
                        <p className='text-center'><b>Proyectos: </b>{user}</p>
                    
                    <Button variant="warning"
                    onClick={openEditModal}>
                        Editar cuenta
                    </Button>
                    <Button variant="link" className="mt-1" onClick={openChangePasswordModal}>
                        Cambiar contraseña
                    </Button>
                    <Button variant= "link" className="mt-3 text-danger"
                        onClick={openDeleteModal}>
                        Eliminar cuenta
                    </Button>
                    </Card>
                </Col>
            </Row>
        </Container>
        <DeleteModal
            isOpen={isOpenDeleteModal}
            close={closeDeleteModal}
        />
         <ChangePasswordModal
            isOpen={isOpenChangePasswordModal}
            close={closeChangePasswordModal}

        />
        <EditModal
            isOpen={isOpenEditModal}
            close={closeEditModal}
            user= {user}
        />
        </>
    )
}