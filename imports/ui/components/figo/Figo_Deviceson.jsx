import React, { useState, useEffect } from 'react'
import { FlexboxGrid, Panel, Col, IconButton, Icon } from 'rsuite'
import { ButtonToolbar, CheckPicker, Form, FormGroup, ControlLabel, SelectPicker } from 'rsuite'

import { rstream } from '../../../api/streamers'

const Figo_Deviceson = (props) => {
    const actionList = [
        { label: 'Enviar comando', value: 'comando', id: 1 , role: 'out'},
        { label: 'Enviar Script', value: 'script', id: 2 , role: 'out'},
    ]
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
    /* ActionButtonGroup */
    const [showActionPanel, setShowActionPanel] = useState(0)

    const onClickOpenMessage = () => {
        if (checkPickerValueDevices.length > 0) {
            setShowActionPanel(1)
        }
    }
    const onClickOpenScript = () => {
        if (checkPickerValueDevices.length > 0) {
            setShowActionPanel(2)
        }
    }
    const ActionSelectPicker = () => (
        <SelectPicker
            data={actionList}
            style={{ width: 258 }}
            groupBy="role"
            placeholder="Select User"
            renderMenuItem={(label, item) => {
                return (
                    <div>
                        <i className="rs-icon rs-icon-user" /> {label}
                    </div>
                );
            }}
            renderMenuGroup={(label, item) => {
                return (
                    <div>
                        <i className="rs-icon rs-icon-group" /> {label} - ({item.children.length})
            </div>
                );
            }}
            renderValue={(value, item) => {
                return (
                    <div>
                        <span style={{ color: '#575757' }}>
                            <i className="rs-icon rs-icon-user" /> User :
              </span>{' '}
                        {value}
                    </div>
                );
            }}
        />

    )
    const MessageDevices = () => {
        return (
            <Panel style={{ height: props.heightApp }}>
                <ul style={{ backgroundColor: 'peru' }}>
                    {checkPickerValueDevices.map(device => (
                        <li>{device}</li>
                    ))}
                </ul>
            </Panel>
        )
    }
    const ScriptDevices = () => { }
    return (

        <FlexboxGrid justify="space-between" align="top">
            <FlexboxGrid.Item colspan={24} componentClass={Col} md={7}>
                <Panel shaded header={<span>Dispositivos</span>} style={{ backgroundColor: '#0f131a', height: props.heightApp }} collapsible defaultExpanded={true}>
                    <Form>
                        <FormGroup>
                            <ControlLabel>Lista de dispositivos</ControlLabel>
                            <ButtonToolbar>

                                <IconButton icon={<Icon icon="comment" />} color="blue" size="sm"
                                    onClick={onClickOpenMessage}
                                >
                                    Mensaje</IconButton>

                                <IconButton icon={<Icon icon="file-text" />} color="violet" size="sm"
                                    onClick={onClickOpenScript}
                                >
                                    Script</IconButton>
                            </ButtonToolbar>
                            <CheckPicker
                                value={checkPickerValueDevices}
                                onChange={onChangeCheckPickerDevices}
                                data={devices}
                                groupBy="role"
                                style={{ width: 258 }}
                                placeholder="Selecciona"
                                renderMenuItem={(label, item) => {
                                    return (
                                        <div>
                                            <i className="rs-icon rs-icon-microchip" /> {label}
                                        </div>
                                    );
                                }}
                                renderMenuGroup={(label, item) => {
                                    return (
                                        <div>
                                            <i className="rs-icon rs-icon-object-group" /> {label} - ({
                                                item.children.length
                                            })
                                        </div>
                                    );
                                }}
                                renderValue={(value, items) => {
                                    return (
                                        <span>
                                            <span style={{ color: '#575757' }}>
                                                {items.length}{' '}<i className="rs-icon rs-icon-microchip" /> :
                                </span>{' '}
                                            {value.join(' , ')}
                                        </span>
                                    );
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Acciones</ControlLabel>
                            <ActionSelectPicker/>
                        </FormGroup>
                    </Form>

                </Panel>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={24} componentClass={Col} md={15}>
                {showActionPanel === 1 && <MessageDevices />}
                {showActionPanel === 2 && <h1>Script</h1>}
            </FlexboxGrid.Item>
        </FlexboxGrid>

    )
}

export default Figo_Deviceson

