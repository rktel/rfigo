import React, { useState, useEffect } from 'react'
import { FlexboxGrid, Col, Panel } from 'rsuite'
import { CheckPicker } from 'rsuite'
import { Form, FormGroup, ControlLabel, ButtonToolbar, Button } from 'rsuite'
import { InputGroup, Input, Icon } from 'rsuite'
import { List } from 'rsuite'
import { notDeepStrictEqual } from 'assert'

import { rstream } from '../../../api/streamers'

const Figo_Deviceson = (props) => {
    /*User fullname */
    const userFullname = localStorage.getItem('rmain_user_firstname') + ' ' + localStorage.getItem('rmain_user_lastname')
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
        // devicesUpdate()
        rstream.on('deliveryMobiles', (mobileArray) => {
            console.log(mobileArray)
        })
    }, [])
    /* Selected devices*/
    const [selectedDevicesCP, setSelectedDevicesCP] = useState([])
    const onChangeSelectedDevicesCP = (value) => {
        setSelectedDevicesCP(value)
    }
    const onCleanSelectedDevicesCP = () => {
        setInputChat('')
    }
    /*----------------------------Actions */
    // Show InputChat
    const [inputChat, setInputChat] = useState('')
    const onChangeInputChat = (value) => setInputChat(value)
    // Click Button Send
    const onClickSendBtn = () => {
        notDeepStrictEqual(selectedDevicesCP.length, 0)
        notDeepStrictEqual(inputChat.length, 0)
        rstream.emit('broadcast', selectedDevicesCP, inputChat, userFullname)
    }
    // Click Button Cancel
    const onClickCancelBtn = () => {
        setInputChat('')
        setSelectedDevicesCP([])
    }
    return (

        <FlexboxGrid>
            <FlexboxGrid.Item componentClass={Col} colspan={24} md={7}>
                <Panel shaded bordered collapsible header="Input" defaultExpanded={true}>
                    <Form>
                        <FormGroup>
                            <ControlLabel>Dispositivos Online</ControlLabel>
                            <CheckPicker data={devices} value={selectedDevicesCP} onChange={onChangeSelectedDevicesCP} style={{ width: 224 }} onClean={onCleanSelectedDevicesCP} />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Acciones</ControlLabel>
                            <ButtonToolbar>
                                <Button color="violet">Script</Button>
                                <Button onClick={onClickCancelBtn}>Reset</Button>
                            </ButtonToolbar>
                        </FormGroup>
                    </Form>
                </Panel>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item componentClass={Col} colspan={24} md={17}>
                <Panel style={{ height: props.heightApp - 20 }} className="flex-container-column-stretch" shaded bordered>
                    <section>
                        {selectedDevicesCP.length != 0 && <List bordered style={{ maxHeight: props.heightApp - 100 }}>
                            {selectedDevicesCP.map((item, index) =>
                                <List.Item key={index} index={index}>
                                    {index + 1} => {item}
                                </List.Item>
                            )}
                        </List>}
                    </section>
                    <section>
                        <InputGroup inside size="lg">
                            <Input onChange={onChangeInputChat} value={inputChat} onPressEnter={onClickSendBtn} />
                            <InputGroup.Button onClick={onClickSendBtn}><Icon icon="send" /></InputGroup.Button>
                        </InputGroup>
                    </section>
                </Panel>
            </FlexboxGrid.Item>
        </FlexboxGrid>

    )
}

export default Figo_Deviceson

