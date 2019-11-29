
import React, { useEffect, useState } from 'react'
import { rstream } from '../../../api/streamers'
import { Panel, FlexboxGrid, Col } from 'rsuite'
import { ButtonToolbar, Icon, IconButton, Button } from 'rsuite'

import { Table } from 'rsuite'
const { Column, HeaderCell, Cell } = Table

import { Modal } from 'rsuite'
import { InputPicker } from 'rsuite'
import { Form, FormGroup, ControlLabel, FormControl } from 'rsuite'

import assert from 'assert'

const Admin_Users = () => {
    const ModalCreateUser = () => {
        const onCreateUser = () => {
            if (formCreateUser.firstname && formCreateUser.lastname && formCreateUser.role) {
                Meteor.call('createPersonal', formCreateUser)
                onCloseModalCreateUser()
            }
        }

        const [formCreateUser, setFormCreateUser] = useState({
            firstname: '',
            lastname: '',
            email: '',
            role: '',
        })
        const onHandleChangeCreateUser = (elements) => {
            setFormCreateUser(elements)
        }
        const userRolList = [
            { label: 'User', value: 'User' },
            { label: 'Admin', value: 'Admin' },
        ]
        return (
            <Modal show={showModalCreateUser} onHide={onCloseModalCreateUser} size="xs" style={{ width: 290 }} backdrop= {false} >
                <Modal.Header>
                    <Modal.Title>Nuevo Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        fluid
                        onChange={onHandleChangeCreateUser}
                        formValue={formCreateUser}
                    >
                        <FormGroup>
                            <ControlLabel>Nombres</ControlLabel>
                            <FormControl name="firstname" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Apellidos</ControlLabel>
                            <FormControl name="lastname" />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Rol</ControlLabel>
                            <FormControl name="role" accepter={InputPicker} data={userRolList} />
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onCreateUser} appearance="primary">
                        Crear
                    </Button>
                    <Button onClick={onCloseModalCreateUser} appearance="subtle">
                        Cancelar
              </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    //MODAL CONFIRM REMOVE COMPONENT
    const ModalConfirmRemoveUser = () => {
        return (
            <Modal backdrop="static" show={showModalConfirmRemoveUser} onHide={onCloseModalConfirmRemoveUser} size="xs" style={{ width: 290 }}>
                <Modal.Body>
                    <Icon
                        icon="remind"
                        style={{
                            color: '#ffb300',
                            fontSize: 24
                        }}
                    />
                    {'  '}
                    {`¿Esta seguro(a) de eliminar el usuario ${userToRemove.firstname}?`}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onRemoveUser} appearance="primary">
                        Si
                    </Button>
                    <Button onClick={onCloseModalConfirmRemoveUser} appearance="subtle">
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
        // SET STATES
    const [users, setUsers] = useState([])
    // HOOK EFFECT
    useEffect(_ => {
        setUsersByMeteor()
        rstream.on('updateUsers', () => {
            setUsersByMeteor()
        })
    }, [])
    // HELP FUNCTIONS
    const setUsersByMeteor = () => {
        Meteor.call('getAllPersonal', (getAllPersonalError, allPersonal) => {
            assert.notDeepStrictEqual(allPersonal, undefined)
            setUsers(allPersonal)
        })
    }

    const [userToRemove, setUserToRemove] = useState({})
    const [showModalConfirmRemoveUser, setShowModalConfirmRemoveUser] = useState(false)
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    //MODAL CREATE USER

    const onOpenModalCreateUser = () => {
        setShowModalCreateUser(true)
    }
    const onCloseModalCreateUser = () => {
        setShowModalCreateUser(false)
    }

    //MODAL CONFIRM REMOVE
    const onRemoveUser = () => {
        Meteor.call('removePersonal', userToRemove)
        setShowModalConfirmRemoveUser(false)
        onClearUserToRemove()
    }

    const onCloseModalConfirmRemoveUser = () => {
        setShowModalConfirmRemoveUser(false)
        onClearUserToRemove()
    }
    const onOpenModalConfirmRemoveUser = () => {
        setShowModalConfirmRemoveUser(true)
    }
    const onSetUserToRemove = (auxUserToRemove) => {
        setUserToRemove(auxUserToRemove)
    }
    const onClearUserToRemove = () => {
        setUserToRemove({})
    }
    return (
        <div>
            <ModalCreateUser />
            <ModalConfirmRemoveUser />
            <FlexboxGrid style={{ marginTop: 8, paddingLeft: 5, paddingRight: 5 }} justify="center">
                <FlexboxGrid.Item componentClass={Col} colspan={24} md={14}>
                    <Panel bordered header={<h5>Usuarios</h5>} style={{ backgroundColor: '#1A1D24' }} shaded>
                        <ButtonToolbar style={{ marginBottom: 10 }}>
                            <IconButton icon={<Icon icon="user-circle-o" />} placement="right" color="green" size="sm" onClick={onOpenModalCreateUser}>
                                Nuevo
                            </IconButton>
                        </ButtonToolbar>
                        <Table
                            
                            bordered
                            height={window.innerHeight - 225}
                            data={users}
                            onRowClick={data => {
                                // console.log(data);
                            }}
                        >

                            <Column width={80}>
                                <HeaderCell>Nombre</HeaderCell>
                                <Cell dataKey="firstname" />
                            </Column>

                            <Column width={100}>
                                <HeaderCell>Apellido</HeaderCell>
                                <Cell dataKey="lastname" />
                            </Column>

                            <Column width={70}>
                                <HeaderCell>Rol</HeaderCell>
                                <Cell dataKey="role" />
                            </Column>

                            <Column width={80}>
                                <HeaderCell>Usuario</HeaderCell>
                                <Cell dataKey="username" />
                            </Column>

                            <Column width={80}>
                                <HeaderCell>Password</HeaderCell>
                                <Cell dataKey="password" />
                            </Column>

                            <Column width={70} fixed="right">
                                <HeaderCell>Accion</HeaderCell>

                                <Cell>
                                    {item => {
                                        const handleOnRemoveItem = () => {
                                            onOpenModalConfirmRemoveUser()
                                            onSetUserToRemove(item)
                                        }
                                        return (
                                            <span>
                                                <IconButton onClick={handleOnRemoveItem} icon={<Icon icon="trash" />} circle size="sm" color='red' />
                                            </span>
                                        )
                                    }}
                                </Cell>
                            </Column>
                        </Table>
                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    )
}



export default Admin_Users