
import React from 'react'
import { Route, withRouter } from 'react-router-dom'

import { Container, Content, Header, Footer } from 'rsuite'
import { Navbar, Nav, Dropdown, ButtonGroup, IconButton, Icon } from 'rsuite'
import { Tooltip, Whisper } from 'rsuite'

import Figo_Deviceson from '../../components/figo/Figo_Deviceson'
import Figo_Scripts from '../../components/figo/Figo_Scripts'
import Figo_Taskstatus from '../../components/figo/Figo_Taskstatus'

const Figo_Home = (props) => {

    const handleClickLogoutBtn = () => {
        Meteor.logout()
        resetRmainUser()
        props.history.push('/login')
    }
    const resetRmainUser = () => {
        localStorage.removeItem('rmain_user_role')
        localStorage.removeItem('rmain_user_spa')
        localStorage.removeItem('rmain_user_firstname')
        localStorage.removeItem('rmain_user_lastname')
    }

    return (
        <Container className="flex-container-admin" style={{ height: window.innerHeight }}>
            <Header className="flex-item-admin">
                <Navbar className="header-navbar" appearance="inverse">
                    <Navbar.Header>
                        <img src="/img/seclog.png" alt="Securitas Logo" height="46" className="brand-img" />
                    </Navbar.Header>
                    <Navbar.Body>
                        <Nav pullRight>
                            <Dropdown title={localStorage.getItem('rmain_user_firstname') + ' ' + localStorage.getItem('rmain_user_lastname')} icon={<Icon icon="user-circle-o" />}>
                                <Dropdown.Item onClick={handleClickLogoutBtn}>Cerrar sesión</Dropdown.Item>
                            </Dropdown>
                        </Nav>
                    </Navbar.Body>
                </Navbar>
            </Header>
            <Content className="flex-item-admin flex-container-admin-content" style={{ overflow: 'auto' }}>
                <section className="flex-item-admin-content" >
                    <ButtonGroup vertical >
                        <Whisper trigger="hover" placement="right" speaker={<Tooltip>Dispositivos online</Tooltip>}>
                            <IconButton icon={<Icon icon="hdd-o" />} size="lg" onClick={() => props.history.push('/figo/deviceson')} />
                        </Whisper>
                        <Whisper trigger="hover" placement="right" speaker={<Tooltip>Estado tareas</Tooltip>}>
                            <IconButton icon={<Icon icon="task" />} size="lg" onClick={() => props.history.push('/figo/taskstatus')} />
                        </Whisper>
                        <Whisper trigger="hover" placement="right" speaker={<Tooltip>Scripts</Tooltip>}>
                            <IconButton icon={<Icon icon="file-code-o" />} size="lg" onClick={() => props.history.push('/figo/scripts')} />
                        </Whisper>
                    </ButtonGroup>
                </section>
                <section className="flex-item-admin-content" >
                    <Route path={'/figo/deviceson/'} render={_ => (<Figo_Deviceson />)} />
                    <Route path={'/figo/taskstatus/'} render={_ => (< Figo_Taskstatus />)} />
                    <Route path={'/figo/scripts/'} render={_ => (<Figo_Scripts />)} />
                </section>
            </Content>
            <Footer className="flex-item-admin"><small>&copy; Copyright {new Date().getFullYear()}, Securitas-Perú</small></Footer>
        </Container>
    )
}

export default withRouter(Figo_Home)