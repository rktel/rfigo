import React, { useState, useEffect } from 'react'
import { FlexboxGrid, Panel, Col, IconButton, Icon } from 'rsuite'
import { ButtonToolbar, CheckPicker } from 'rsuite'


import { rstream } from '../../../api/streamers'

const ActionButtonGroup = () => (
    <ButtonToolbar>
        <IconButton icon={<Icon icon="comment" />} color="blue" circle size="sm" />
        <IconButton icon={<Icon icon="file-text" />} color="red" circle size="sm" />
    </ButtonToolbar>
)
const DeviceOnIcon = () => <Icon icon="btn-on" size="lg" style={{ color: 'green' }} />
const DeviceOffIcon = () => <Icon icon="btn-off" size="lg" style={{ color: 'red' }} />


const Figo_Deviceson = (props) => {
    const [devices, setDevices] = useState([])
    useEffect(() => {
        rstream.emit('getDevices')
        rstream.on('devices', (devicesBack) => {
            // console.log(devicesBack)
            setDevices(devicesBack)
        })
    }, [])
    const [checkPickerValueDevices, setCheckPickerValueDevices] = useState([])
    const onChangeCheckPickerDevices = (deviceValue) => {
        setCheckPickerValueDevices(deviceValue)
    }


    return (

        <FlexboxGrid style={{ height: props.heightApp - 56 }} justify="start" align="top">
            <FlexboxGrid.Item colspan={24} componentClass={Col} md={7}>
                <Panel shaded header={<span>Dispositivos</span>} style={{ backgroundColor: '#0f131a' }} collapsible defaultExpanded={true}>
                    <CheckPicker
                        value={checkPickerValueDevices}
                        onChange={onChangeCheckPickerDevices}
                        data={devices}
                        groupBy="role"
                        style={{ width: 224 }} 
                    />


                </Panel>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={24} componentClass={Col} md={15}>
                B
            </FlexboxGrid.Item>
        </FlexboxGrid>

    )
}

export default Figo_Deviceson