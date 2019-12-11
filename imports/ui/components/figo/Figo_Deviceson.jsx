import React, { useState, useEffect } from 'react'
import { FlexboxGrid, Col, Panel } from 'rsuite'


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
            <FlexboxGrid.Item componentClass={Col} colspan={24} md={6}>
                <Panel style={{ backgroundColor: 'gray' }}>
                    Pepa
                </Panel>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item componentClass={Col} colspan={24} md={18}>
                <Panel style={{ backgroundColor: 'blue' }}>
                    George
                </Panel>
            </FlexboxGrid.Item>
        </FlexboxGrid>

    )
}

export default Figo_Deviceson

