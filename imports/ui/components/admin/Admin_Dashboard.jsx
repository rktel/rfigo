import React from 'react'
import { FlexboxGrid, Col } from 'rsuite'
import { Panel } from 'rsuite'

const Admin_Dashboard = () => {
    return (
        <div>
            <FlexboxGrid style={{ marginTop: 8 }}>
                <FlexboxGrid.Item componentClass={Col} colspan={24} md={8} >
                    <Panel bordered header={<h5>Dispositivos Online</h5>}>
                        <h4>1500</h4>
                    </Panel>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24} md={8} >
                    <Panel bordered header={<h5>Dispositivos Offline</h5>}>
                        <h4>500</h4>
                    </Panel>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24} md={8} >
                    <Panel bordered header={<h5>Dispositivos Total</h5>}>
                        <h4>2000</h4>
                    </Panel>
                </FlexboxGrid.Item>

            </FlexboxGrid>
            <FlexboxGrid style={{ marginTop: 8 }}>
                <FlexboxGrid.Item componentClass={Col} colspan={24} md={8} >
                    <Panel bordered header={<h5>Tareas en Proceso</h5>}>
                        <h4>1500</h4>
                    </Panel>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24} md={8} >
                    <Panel bordered header={<h5>Tareas Terminadas</h5>}>
                        <h4>500</h4>
                    </Panel>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24} md={8} >
                    <Panel bordered header={<h5>Tareas Total</h5>}>
                        <h4>2000</h4>
                    </Panel>
                </FlexboxGrid.Item>

            </FlexboxGrid>
            <FlexboxGrid style={{ marginTop: 8 }}>
                <FlexboxGrid.Item componentClass={Col} colspan={24} md={8} >
                    <Panel bordered header={<h5>Scripts Total</h5>}>
                        <h4>100</h4>
                    </Panel>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24} md={8} >
                    <Panel bordered header={<h5>Usuarios Total</h5>}>
                        <h4>25</h4>
                    </Panel>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    )
}

export default Admin_Dashboard