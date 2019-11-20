import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Sidenav, Nav, Icon } from 'rsuite'

const Admin_Sidenav = (props) => {
    useEffect(() => {
        switch (props.history.location.pathname) {
            case "/admin/dashboard":
                setActiveKey("1")
                break;
            case "/admin/users":
                setActiveKey("2")
                break;
            default:
                break;
        }
    }, [])
    const [activeKey, setActiveKey] = useState('1')
    return (
        <Sidenav className="flex-item" expanded={false} activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
            <Nav>
                <Nav.Item eventKey="1" icon={<Icon icon="squares" />} onClick={() => props.history.push('/admin/dashboard')}>
                    Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<Icon icon="group" />} onClick={() => props.history.push('/admin/users')}>
                    Usuarios
                </Nav.Item>
            </Nav>
        </Sidenav >
    )
}

export default withRouter(Admin_Sidenav)