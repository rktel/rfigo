import React from 'react'
import { Container, Content, Sidebar, FlexboxGrid, Col } from 'rsuite'
import { Route } from 'react-router-dom'

import App_Header from '../../components/app/App_Header'


import Admin_Dashboard from '../../components/admin/Admin_Dashboard'
import Admin_Users from '../../components/admin/Admin_Users'
import Admin_Sidenav from '../../components/admin/Admin_Sidenav'

const Admin_Home = (props) => {

    return (
        <Container style={{ height: props.heightApp }}>
            <Sidebar width={56}>
                <Admin_Sidenav />
            </Sidebar>
            <Container>
                <App_Header />
                <Content>
                    <FlexboxGrid >
                        <FlexboxGrid.Item style={{height: props.heightApp - 56, overflow: 'auto'}} colspan={24}>
                            <Route path="/admin/dashboard" render={()=> <Admin_Dashboard/>}/>
                            <Route path="/admin/users" render={()=> <Admin_Users/>}/>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
            </Container>
        </Container>
    )
}

export default Admin_Home
