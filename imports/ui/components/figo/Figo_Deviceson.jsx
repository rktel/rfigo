import React, { useState, useEffect } from 'react'
import { FlexboxGrid, Panel, Col, List, IconButton, Icon } from 'rsuite'
import { ButtonToolbar, InputGroup, Input } from 'rsuite'
import { Checkbox } from 'rsuite'

import { rstream } from '../../../api/streamers'

const data = [
    { value: '201', label: '201' },
    { value: '202', label: '202' },
    { value: '203', label: '203' },
    { value: '204', label: '204' },
    { value: '205', label: '205' },
    { value: '206', label: '206' },
    { value: '206', label: '206' },
    { value: '206', label: '206' },
    { value: '206', label: '206' },
    { value: '206', label: '206' },
    { value: '206', label: '206' },
    { value: '206', label: '206' },
    { value: '206', label: '206' },
    { value: '222', label: '222' },

]
const actionList = [
    { value: 1, label: 'Crear grupo' },
    { value: 2, label: 'Enviar comando' },
    { value: 3, label: 'Enviar script' },
    { value: 4, label: 'Crear canal individual' },
    { value: 5, label: 'Crear canal broadcast' },
]
const scriptList = [
    { value: 'a', label: 'One' },
    { value: 'b', label: 'Two' },
    { value: 'c', label: 'Three' },
    { value: 'd', label: 'Four' },
    { value: 'e', label: 'Five' },
]

const Figo_Deviceson = (props) => {
    const [devices, setDevices] = useState([])
    useEffect(() => {
        rstream.emit('getDevices')
        rstream.on('devices', (devicesBack) => {
            // console.log(devicesBack)
            setDevices(devicesBack)
        })
    }, [])
    const ActionButtonGroup = () => (
        <ButtonToolbar>
            <IconButton icon={<Icon icon="comment" />} color="blue" circle size="sm" />
            <IconButton icon={<Icon icon="file-text" />} color="red" circle size="sm" />
        </ButtonToolbar>
    )
    const DeviceOnIcon = () => <Icon icon="btn-on" size="lg" style={{ color: 'green' }} />
    const DeviceOffIcon = () => <Icon icon="btn-off" size="lg" style={{ color: 'red' }} />
    const [searchDeviceInput, setSearchDeviceInput] = useState('')
    const onChangeSearchDeviceInput = (auxSearchDeviceInput) => setSearchDeviceInput(auxSearchDeviceInput)
    const DevicesList = () => devices
        .filter(el => searchDeviceInput === '' || el.mobileID.includes(searchDeviceInput))
        .map((item, index) =>
            <List.Item key={index} index={index}>
                <Checkbox> {item.status === 'on' ? <DeviceOnIcon /> : <DeviceOffIcon />} {item.mobileID} </Checkbox>
            </List.Item>
        )
    return (

        <FlexboxGrid style={{ height: props.heightApp - 56 }} justify="start" align="top">
            <FlexboxGrid.Item colspan={24} componentClass={Col} md={7}>
                <Panel shaded header={<span>Dispositivos</span>} style={{ backgroundColor: '#0f131a' }} collapsible defaultExpanded={true}>
                    <InputGroup style={{ marginBottom: 10 }}>
                        <Input placeholder="Buscar dispositivo" value={searchDeviceInput} onChange={onChangeSearchDeviceInput} />
                        <InputGroup.Addon><Icon icon="search" /></InputGroup.Addon>
                    </InputGroup>
                    <List size="sm" bordered style={{ marginBottom: 10 }}>
                        <List.Item>
                            <FlexboxGrid justify="space-between">
                                <FlexboxGrid.Item><ActionButtonGroup /></FlexboxGrid.Item>
                            </FlexboxGrid>
                        </List.Item>
                    </List>
                    <List hover style={{ height: props.heightApp - 200 }} size="sm" bordered>
                        <DevicesList />
                    </List>
                </Panel>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={24} componentClass={Col} md={15}>
                B
            </FlexboxGrid.Item>
        </FlexboxGrid>

    )
}

export default Figo_Deviceson