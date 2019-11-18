import React from 'react'
import { Container, Content, Header, Footer } from 'rsuite'
import { Navbar, Nav, Dropdown, ButtonGroup, IconButton, Icon } from 'rsuite'
import { Tooltip, Whisper } from 'rsuite'
import { Route, withRouter } from 'react-router-dom'

import Admin_Dashboard from '../../components/admin/Admin_Dashboard'
import Admin_Users from '../../components/admin/Admin_Users'

const Admin_Home = (props) => {

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
                        <Whisper trigger="hover" placement="right" speaker={<Tooltip>Dashboard Home</Tooltip>}>
                            <IconButton icon={<Icon icon="home" />} size="lg" onClick={() => props.history.push('/admin/dashboard')} />
                        </Whisper>
                        <Whisper trigger="hover" placement="right" speaker={<Tooltip>Usuarios</Tooltip>}>
                            <IconButton icon={<Icon icon="group" />} size="lg" onClick={() => props.history.push('/admin/users')}/>
                        </Whisper>
                    </ButtonGroup>
                </section>
                <section className="flex-item-admin-content" >
                    <Route path={'/admin/dashboard/'} render={_ => (<Admin_Dashboard />)} />
                    <Route path={'/admin/users/'} render={_ => (<Admin_Users />)} />
                </section>
            </Content>
            <Footer className="flex-item-admin"><small>&copy; Copyright {new Date().getFullYear()}, Securitas-Perú</small></Footer>
        </Container>
    )
}

export default withRouter(Admin_Home)
