import React from 'react'
import { Container, Content } from 'rsuite'
import { Route } from 'react-router-dom'

import App_Header from '../../components/app/App_Header'
import App_Footer from '../../components/app/App_Footer'

import Admin_Dashboard from '../../components/admin/Admin_Dashboard'
import Admin_Users from '../../components/admin/Admin_Users'
import Admin_Sidenav from '../../components/admin/Admin_Sidenav'

const Admin_Home = () => {
   
    return (
        <Container style={{ height: window.innerHeight }}>
            <App_Header />
            <Content className="flex-container">
                <Admin_Sidenav/>
                <section className="flex-item" style={{ overflow: 'auto' }}>
                    <Route path={'/admin/dashboard/'} render={() => (<Admin_Dashboard />)} />
                    <Route path={'/admin/users/'} render={() => (<Admin_Users />)} />
                </section>
            </Content>
            <App_Footer />
        </Container>
    )
}

export default Admin_Home
