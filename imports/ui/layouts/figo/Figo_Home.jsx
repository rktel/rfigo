
import React from 'react'
import { Container, Content, Sidebar, FlexboxGrid, Col } from 'rsuite'
import { Route } from 'react-router-dom'

import App_Header from '../../components/app/App_Header'
import App_Footer from '../../components/app/App_Footer'


import Figo_Deviceson from '../../components/figo/Figo_Deviceson'
import Figo_Scripts from '../../components/figo/Figo_Scripts'
import Figo_Taskstatus from '../../components/figo/Figo_Taskstatus'
import Figo_Sidenav from '../../components/figo/Figo_Sidenav'

const Figo_Home = (props) => {

    return (
        <Container style={{ height: props.heightApp }}>
            <Sidebar width={56}>
                <Figo_Sidenav />
            </Sidebar>
            <Container>

                <Content style={{ padding: 8}}>

                    <Route path={'/figo/deviceson/'} render={() => (<Figo_Deviceson heightApp={props.heightApp} />)} />
                    <Route path={'/figo/taskstatus/'} render={() => (< Figo_Taskstatus />)} />
                    <Route path={'/figo/scripts/'} render={() => (<Figo_Scripts />)} />

                </Content>
            </Container>

        </Container>
    )
}

export default Figo_Home