import React, { useState, useEffect } from 'react'
import { FlexboxGrid, Panel, Col, IconButton, Icon } from 'rsuite'
import { ButtonToolbar, Form, FormGroup, ControlLabel, SelectPicker } from 'rsuite'

import { rstream } from '../../../api/streamers'

const Figo_Deviceson = (props) => {
 
    const [devices, setDevices] = useState([])
    useEffect(() => {
        rstream.emit('getDevices')
        rstream.on('devices', (devicesBack) => {
            console.log(devicesBack)
            setDevices(devicesBack)
        })
    }, [])
 
    return (

        <FlexboxGrid justify="space-between" align="top">

        </FlexboxGrid>

    )
}

export default Figo_Deviceson

