import React, { useState, useEffect } from 'react'
import { FlexboxGrid } from 'rsuite'


import { rstream } from '../../../api/streamers'

const Figo_Deviceson = (props) => {
    /* Devices */
    const [devices, setDevices] = useState([])
    const devicesUpdate = () => {
        Meteor.call('getAllDevicesOnline', (errorDevicesDB, devicesDB) => {
            console.log(errorDevicesDB, devicesDB)
        })
    }
    useEffect(() => {
        devicesUpdate()
        rstream.on('devicesUpdate', () => {
            devicesUpdate()
        })
    }, [])
    /* Selected devices*/
    const [selectedDevices, setSelectedDevices] = useState([])
    return (

        <FlexboxGrid justify="space-between" align="top">

        </FlexboxGrid>

    )
}

export default Figo_Deviceson

