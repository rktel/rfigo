import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Content, Header, Footer, Navbar, Button, FlexboxGrid } from 'rsuite'

const Nofound = (props) => {
    const isUserRole = () => Meteor.userId() && localStorage.getItem('rmain_user_role') === 'User'
    const isAdminRole = () => Meteor.userId() && localStorage.getItem('rmain_user_role') === 'Admin'
    return (
        <Container className="bg-nofound" style={{ height: props.heightApp }}>
            <Header>
                <Navbar className="header-navbar">
                    <Navbar.Header>
                    </Navbar.Header>
                    <Navbar.Body>
                    </Navbar.Body>
                </Navbar>
            </Header>
            <Content>
                <FlexboxGrid justify="center" align="middle" style={{ height: props.heightApp - 100 }}>
                    <FlexboxGrid.Item>
                        {isUserRole() && <Button appearance="primary" componentClass={Link} to="/figo/deviceson">Ir al inicio</Button>}
                        {isAdminRole() && <Button appearance="primary" componentClass={Link} to="/admin/dashboard">Ir al inicio </Button>}
                        {!Meteor.userId() && <Button appearance="primary" componentClass={Link} to="/login">Ir al login</Button>}
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
            <Footer></Footer>
        </Container>
    )
}

export default Nofound