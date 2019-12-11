import React, { useState, useEffect } from 'react'
import { FlexboxGrid } from 'rsuite'


import { rstream } from '../../../api/streamers'

const Figo_Deviceson = (props) => {
    /* Devices */
    const [devices, setDevices] = useState([])
    useEffect(() => {
        Meteor.call('getAllDevices', devicesDB => {
            console.log(devicesDB)
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

