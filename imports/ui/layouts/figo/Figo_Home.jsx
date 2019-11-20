
import React from 'react'
import { Route, withRouter } from 'react-router-dom'

import { Container, Content } from 'rsuite'
import { ButtonGroup, IconButton, Icon } from 'rsuite'
import { Tooltip, Whisper } from 'rsuite'

import App_Header from '../../components/app/App_Header'
import App_Footer from '../../components/app/App_Footer'

import Figo_Deviceson from '../../components/figo/Figo_Deviceson'
import Figo_Scripts from '../../components/figo/Figo_Scripts'
import Figo_Taskstatus from '../../components/figo/Figo_Taskstatus'

const Figo_Home = (props) => {

    return (
        <Container  style={{ height: window.innerHeight }}>
            <App_Header/>
            <Content  style={{ overflow: 'auto' }}>
                <section >
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
                <section  >
                    <Route path={'/figo/deviceson/'} render={_ => (<Figo_Deviceson />)} />
                    <Route path={'/figo/taskstatus/'} render={_ => (< Figo_Taskstatus />)} />
                    <Route path={'/figo/scripts/'} render={_ => (<Figo_Scripts />)} />
                </section>
            </Content>
            <App_Footer/>
        </Container>
    )
}

export default withRouter(Figo_Home)