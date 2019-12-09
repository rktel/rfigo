import React, { useState, useEffect } from 'react'
import { FlexboxGrid, Panel, Col, IconButton, Icon } from 'rsuite'
import { ButtonToolbar, CheckPicker, Form, FormGroup, ControlLabel } from 'rsuite'
import { Tooltip, Whisper } from 'rsuite'

import { rstream } from '../../../api/streamers'

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
    /* ActionButtonGroup */
    const onClickSendMessage = () => {
        alert(checkPickerValueDevices.toString())
    }
    const onClickSendScript = () => {
        alert(checkPickerValueDevices.toString())
    }
    const ActionButtonGroup = () => (
        <ButtonToolbar>
            <Whisper placement="right" trigger="hover" speaker={<Tooltip>Enviar Mensaje</Tooltip>}>
                <IconButton icon={<Icon icon="comment" />} color="blue" circle size="sm"
                    onClick={onClickSendMessage}
                />
            </Whisper>
            <Whisper placement="right" trigger="hover" speaker={<Tooltip>Enviar Script</Tooltip>}>
                <IconButton icon={<Icon icon="file-text" />} color="red" circle size="sm"
                    onClick={onClickSendScript}
                />
            </Whisper>
        </ButtonToolbar>
    )

    return (

        <FlexboxGrid style={{ height: props.heightApp - 56 }} justify="start" align="top">
            <FlexboxGrid.Item colspan={24} componentClass={Col} md={7}>
                <Panel shaded header={<span>Dispositivos</span>} style={{ backgroundColor: '#0f131a' }} collapsible defaultExpanded={true}>
                    <Form>
                        <FormGroup>
                            <ControlLabel>Lista de dispositivos</ControlLabel>
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
                            <ActionButtonGroup />
                        </FormGroup>
                    </Form>


                </Panel>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={24} componentClass={Col} md={15}>
                B
            </FlexboxGrid.Item>
        </FlexboxGrid>

    )
}

export default Figo_Deviceson

