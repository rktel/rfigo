import React from 'react'
import { withRouter } from 'react-router-dom'
import { Header, Navbar, Nav, Dropdown, Icon } from 'rsuite'


const App_Header = (props) => {
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
    )
}
export default withRouter(App_Header)