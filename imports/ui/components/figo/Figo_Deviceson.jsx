import React, { useState, useEffect } from 'react'
import { FlexboxGrid, Panel } from 'rsuite'


import { rstream } from '../../../api/streamers'

const Figo_Deviceson = (props) => {
    /* Devices */
    const [devices, setDevices] = useState([])
    const devicesUpdate = () => {
        Meteor.call('getAllDevicesOnline', (errorDevicesDB, devicesDB) => {
            if (errorDevicesDB === undefined && devicesDB.length > 0) {
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
    const [selectedDevices, setSelectedDevices] = useState([])
    return (

        <FlexboxGrid>
            <FlexboxGrid.Item colspan={8}>
                <Panel style={{ backgroundColor: 'gray' }}>
                    Pepa
                </Panel>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={16}>
                <Panel style={{ backgroundColor: 'blue' }}>
                    George
                </Panel>
            </FlexboxGrid.Item>
        </FlexboxGrid>

    )
}

export default Figo_Deviceson

