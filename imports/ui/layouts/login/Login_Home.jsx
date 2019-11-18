import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Header, Content, Footer } from 'rsuite'
import { Navbar, Panel } from 'rsuite'
import { Form, ControlLabel, FormControl, FormGroup } from 'rsuite'
import { ButtonToolbar, Button } from 'rsuite'

import assert from 'assert'

const Login_Home = (props) => {
    //Helper functions
    const setRmainUser = (personal) => {
        const { role, firstname, lastname } = personal
        localStorage.setItem('rmain_user_role', role)
        localStorage.setItem('rmain_user_firstname', firstname)
        localStorage.setItem('rmain_user_lastname', lastname)
    }
    const [formLogin, setformLogin] = useState({
        username: '',
        password: ''
    })
    const handleOnChangeFormLogin = elements => setformLogin(elements)
    const handleOnClickLoginBtn = () => {
        if (formLogin.username && formLogin.password) {
            const { username, password } = formLogin
            Meteor.loginWithPassword(username, password, (loginError) => {
                assert.ok(!loginError)
                Meteor.call('getPersonal', (getPersonalError, personal) => {
                    assert.ok(!getPersonalError)
                    setRmainUser(personal)
                    if (personal.role == 'Admin')
                        props.history.push('/admin/dashboard')
                    if (personal.role == 'User')
                        props.history.push('/figo/deviceson')
                })
            })
        }
    }
    return (
        <Container className="flex-container-login" style={{ height: window.innerHeight }}>
            <Header className="flex-item-login">
                <Navbar className="header-navbar">
                    <Navbar.Header>
                        <img src="/img/seclog.png" alt="Securitas Logo" height="46" className="brand-img" />
                    </Navbar.Header>
                </Navbar>
            </Header>
            <Content className="flex-item-login">
                <Panel header={<div><h4>FiGo</h4><h5 style={{ textAlign: 'center', color: '#777' }}>Login</h5></div>} bordered style={{ backgroundColor: 'white' }}>
                    <Form fluid formValue={formLogin} onChange={handleOnChangeFormLogin}>
                        <FormGroup>
                            <ControlLabel>Usuario</ControlLabel>
                            <FormControl name="username" style={{ width: 280 }} />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Contraseña</ControlLabel>
                            <FormControl name="password" type="password" style={{ width: 280 }} />
                        </FormGroup>
                        <FormGroup>
                            <ButtonToolbar>
                                <Button color="blue" block onClick={handleOnClickLoginBtn}>Ingresar</Button>
                            </ButtonToolbar>
                        </FormGroup>
                    </Form>
                </Panel>
            </Content>
            <Footer className="flex-item-login"><small>&copy; Copyright {new Date().getFullYear()}, Securitas-Perú</small></Footer>
        </Container>
    )
}

export default withRouter(Login_Home)