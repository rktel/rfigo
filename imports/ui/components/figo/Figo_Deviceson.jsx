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

        <FlexboxGrid justify="start" align="top">
            <FlexboxGrid.Item>
                <Panel style={{ width: 300, height: props.heightApp, backgroundColor: 'gray' }}>
                    Pepa
                </Panel>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item>
                <Panel style={{ height: props.heightApp, backgroundColor: 'blue' }}>
                    George
                </Panel>
            </FlexboxGrid.Item>
        </FlexboxGrid>

    )
}

export default Figo_Deviceson

