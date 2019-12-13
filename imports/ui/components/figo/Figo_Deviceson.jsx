import React, { useState, useEffect } from 'react'
import { FlexboxGrid, Col, Panel } from 'rsuite'
import { CheckPicker } from 'rsuite'
import { Form, FormGroup, ControlLabel, ButtonToolbar, Button } from 'rsuite'
import { InputGroup, Input, Icon } from 'rsuite'
import { List } from 'rsuite'


import { rstream } from '../../../api/streamers'

const Figo_Deviceson = (props) => {
    /* Devices */
    const [devices, setDevices] = useState([])
    const devicesUpdate = () => {
        Meteor.call('getAllDevicesOnline', (errorDevicesDB, devicesDB) => {
            if (errorDevicesDB === undefined && devicesDB.length > 0) {
                devicesDB.forEach(item => item.label = item.value = item.mobileID)
                setDevices(devicesDB)
            }
        })
    }
    useEffect(() => {
        devicesUpdate()
        rstream.on('devicesUpdate', () => {
            devicesUpdate()
        })
    }, [])
    /* Selected devices*/
    const [selectedDevicesCP, setSelectedDevicesCP] = useState([])
    const onChangeSelectedDevicesCP = (value) =>{
        console.log(value)
    }
    /*Actions */
    const onClickChatBtn = () => {

    }
    return (

        <FlexboxGrid>
            <FlexboxGrid.Item componentClass={Col} colspan={24} md={7}>
                <Panel shaded bordered>
                    <Form>
                        <FormGroup>
                            <ControlLabel>Dispositivos Online</ControlLabel>
                            <CheckPicker data={devices} value={selectedDevicesCP} onChange={onChangeSelectedDevicesCP} style={{ width: 224 }} />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Acciones</ControlLabel>
                            <ButtonToolbar>
                                <Button onClick={onClickChatBtn}>Chat</Button>
                                <Button>Script</Button>
                            </ButtonToolbar>
                        </FormGroup>
                    </Form>
                </Panel>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item componentClass={Col} colspan={24} md={17}>
                <Panel style={{ height: props.heightApp - 20 }} className="flex-container-column-stretch" shaded bordered>
                    <section>
                        <List style={{ height: props.heightApp - 100 }}>
                            {selectedDevicesCP.map((item, index) =>
                                <List.Item key={index} index={index}>
                                    {index + 1} - {item}
                                </List.Item>
                            )}
                        </List>
                    </section>
                    <section>
                        <InputGroup inside size="lg">
                            <Input />
                            <InputGroup.Button><Icon icon="send" /></InputGroup.Button>
                        </InputGroup>
                    </section>
                </Panel>
            </FlexboxGrid.Item>
        </FlexboxGrid>

    )
}

export default Figo_Deviceson

