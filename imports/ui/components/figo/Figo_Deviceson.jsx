import React from 'react'
import { FlexboxGrid,  Panel} from 'rsuite'
import { Grid, Row, Col} from 'rsuite'


const Figo_Deviceson = () => {
    return (

        <FlexboxGrid style={{ marginTop: 8 }}>
            <FlexboxGrid.Item componentClass={Col} colspan={24} md={8}>
                <Panel bordered shaded style={{ backgroundColor: 'white', height: window.innerHeight - 85 }} header={<h5>Dispositivos Online {5}</h5>}>
                    <Grid fluid>
                        <Row gutter={16}>
                            <Col xs={12}>xs={12}</Col>
                            <Col xs={12}>xs={12}</Col>
                        </Row>
                    </Grid>
                </Panel>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item componentClass={Col} colspan={24} md={16}>
                <Panel bordered shaded style={{ backgroundColor: 'white', height: window.innerHeight - 85 }} header={<h5>Action</h5>}>
                    <h4>Send</h4>
                </Panel>
            </FlexboxGrid.Item>
        </FlexboxGrid>

    )
}

export default Figo_Deviceson