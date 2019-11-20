import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Sidenav, Nav, Icon } from 'rsuite'

const Figo_Sidenav = (props) => {
    useEffect(() => {
        switch (props.history.location.pathname) {
            case "/figo/deviceson":
                setActiveKey("1")
                break;
            case "/figo/taskstatus":
                setActiveKey("2")
                break;
            case "/figo/scripts":
                setActiveKey("3")
                break;
            default:
                break;
        }
    }, [])
    const [activeKey, setActiveKey] = useState('1')
    return (
        <Sidenav className="flex-item" expanded={false} activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
            <Nav>
                <Nav.Item eventKey="1" icon={<Icon icon="hdd-o" />} onClick={() => props.history.push('/figo/deviceson')}>
                    Dispositivos online
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<Icon icon="task" />} onClick={() => props.history.push('/figo/taskstatus')}>
                    Estado tareas
                </Nav.Item>
                <Nav.Item eventKey="3" icon={<Icon icon="file-code-o" />} onClick={() => props.history.push('/figo/scripts')}>
                    Scripts
                </Nav.Item>
            </Nav>
        </Sidenav >
    )
}

export default withRouter(Figo_Sidenav)