
import React from 'react'
import { Container, Content } from 'rsuite'
import { Route } from 'react-router-dom'

import App_Header from '../../components/app/App_Header'
import App_Footer from '../../components/app/App_Footer'

import Figo_Deviceson from '../../components/figo/Figo_Deviceson'
import Figo_Scripts from '../../components/figo/Figo_Scripts'
import Figo_Taskstatus from '../../components/figo/Figo_Taskstatus'
import Figo_Sidenav from '../../components/figo/Figo_Sidenav'

const Figo_Home = () => {

    return (
        <Container style={{ height: window.innerHeight }}>
            <App_Header />
            <Content className="flex-container">
                <Figo_Sidenav />
                <section className="flex-item" style={{ overflow: 'auto'}}>
                    <Route path={'/figo/deviceson/'} render={() => (<Figo_Deviceson />)} />
                    <Route path={'/figo/taskstatus/'} render={() => (< Figo_Taskstatus />)} />
                    <Route path={'/figo/scripts/'} render={() => (<Figo_Scripts />)} />
                </section>
            </Content>
            <App_Footer />
        </Container>
    )
}

export default Figo_Home