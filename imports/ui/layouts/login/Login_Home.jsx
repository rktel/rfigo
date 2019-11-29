import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Container, Header, Content, FlexboxGrid } from 'rsuite'
import { Panel } from 'rsuite'
import { Form, ControlLabel, FormControl, FormGroup } from 'rsuite'
import { ButtonToolbar, Button } from 'rsuite'

import App_Footer from '../../components/app/App_Footer'

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
    const handleOnClickLoginBtn = () => {
        if (formLogin.username && formLogin.password) {
            const { username, password } = formLogin
            Meteor.loginWithPassword(username, password, (loginError) => {
                assert.deepStrictEqual(loginError, undefined)
                Meteor.call('getPersonal', (getPersonalError, personal) => {
                    assert.notDeepStrictEqual(personal, undefined)
                    setRmainUser(personal)
                    if (personal.role == 'Admin')
                        props.history.push('/admin/dashboard')
                    if (personal.role == 'User')
                        props.history.push('/figo/deviceson')
                })
            })
        }
    }
    const handleOnPressDown = (event) => {
        (event.key === 'Enter') && handleOnClickLoginBtn()
    }
    const LoginHeader = () => (
        <div>
            <h4><img src="/img/learn.svg" /></h4>
            <h4>FiGo 2020</h4><br />
            <h5 style={{ textAlign: 'center', color: '#777' }}>Login</h5>
        </div>
    )

    return (
        <Container style={{ height: props.heightApp }}>
            <Header></Header>
            <Content>
                <FlexboxGrid justify="center" align="middle" style={{ height: props.heightApp - 20 }}>
                    <FlexboxGrid.Item>
                        <Panel header={<LoginHeader />} bordered shaded style={{ backgroundColor: '#1A1D24', paddingTop: 20, paddingBottom: 20, width: 290 }}>
                            <Form fluid formValue={formLogin} onChange={elements => setformLogin(elements)} onKeyDown={handleOnPressDown}>
                                <FormGroup >
                                    <ControlLabel>Usuario</ControlLabel>
                                    <FormControl name="username" />
                                </FormGroup>
                                <FormGroup>
                                    <ControlLabel>Contraseña</ControlLabel>
                                    <FormControl name="password" type="password" />
                                </FormGroup>
                                <FormGroup>
                                    <ButtonToolbar>
                                        <Button color="violet" block onClick={handleOnClickLoginBtn}>Ingresar</Button>
                                    </ButtonToolbar>
                                </FormGroup>
                            </Form>
                        </Panel>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </Container>
    )
}

export default withRouter(Login_Home)