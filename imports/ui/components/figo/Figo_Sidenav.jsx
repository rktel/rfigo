import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Sidenav, Nav, Icon, Dropdown, Avatar, Divider } from 'rsuite'

const Figo_Sidenav = (props) => {
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
    const AppIcon = () => <img src="/img/learn.svg" alt="Figo Logo" height="30" className="app-img" />
    return (
        <Sidenav className="flex-item" expanded={false} activeKey={activeKey} onSelect={(key) => setActiveKey(key)} style={{ height: '100%' }}>
            <Nav>
                <Nav.Item eventKey="0" renderItem={() => <AppIcon />} hasTooltip={false}></Nav.Item>
                <Nav.Item eventKey="1" icon={<Icon icon="hdd-o" />} onClick={() => props.history.push('/figo/deviceson')}>
                    Dispositivos online
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<Icon icon="task" />} onClick={() => props.history.push('/figo/taskstatus')}>
                    Estado tareas
                </Nav.Item>
                <Nav.Item eventKey="3" icon={<Icon icon="file-code-o" />} onClick={() => props.history.push('/figo/scripts')}>
                    Scripts
                </Nav.Item>
                <Divider />
                <Dropdown
                    placement="rightStart"
                    eventKey="4"
                    title="Opciones"
                    icon={<Icon icon="user-circle-o" />}
                >
                    <Dropdown.Item eventKey="4-1" onClick={handleClickLogoutBtn}>
                        <Avatar circle size="sm">
                            {localStorage.getItem('rmain_user_firstname')[0].toUpperCase()}
                            {localStorage.getItem('rmain_user_lastname')[0].toUpperCase()}
                        </Avatar>
                        {' '}
                        Cerrar sesion
                    </Dropdown.Item>
                </Dropdown>
            </Nav>
        </Sidenav >
    )
}

export default withRouter(Figo_Sidenav)