import { createServer } from 'net'
import { rstream } from '../../../../imports/api/streamers'
import { Devices } from '../../../../imports/api/collections'
import { deepStrictEqual } from 'assert'
// import { _ } from 'meteor/underscore'

// contenedores
const mobiles_0 = new Map()
const mobiles_1 = new Map()
const mobiles_2 = new Map()
const mobiles_3 = new Map()
const mobiles_4 = new Map()
const mobiles_5 = new Map()
const mobiles_6 = new Map()
const mobiles_7 = new Map()
const mobiles_8 = new Map()
const mobiles_9 = new Map()
// get contenedor
const getContainer = (index) => {
    if (index === '0') return mobiles_0
    if (index === '1') return mobiles_1
    if (index === '2') return mobiles_2
    if (index === '3') return mobiles_3
    if (index === '4') return mobiles_4
    if (index === '5') return mobiles_5
    if (index === '6') return mobiles_6
    if (index === '7') return mobiles_7
    if (index === '8') return mobiles_8
    if (index === '9') return mobiles_9
}
const clearContainer = () => {
    mobiles_0.clear()
    mobiles_1.clear()
    mobiles_2.clear()
    mobiles_3.clear()
    mobiles_4.clear()
    mobiles_5.clear()
    mobiles_6.clear()
    mobiles_7.clear()
    mobiles_8.clear()
    mobiles_9.clear()
}
const getAllContainers = () => {
    let allContainers = new Map([...mobiles_0,
    ...mobiles_1,
    ...mobiles_2,
    ...mobiles_3,
    ...mobiles_4,
    ...mobiles_5,
    ...mobiles_6,
    ...mobiles_7,
    ...mobiles_8,
    ...mobiles_9])
    allContainers = allContainers.keys()
    return Array.from(allContainers)
}

rstream.on('sendBroadcast', (selectedDevicesCP, inputChat, userFullname) => {
    console.log(selectedDevicesCP, inputChat, userFullname)
    selectedDevicesCP.map(mobileID => {
        const deviceDB = Devices.findOne({ mobileID })
        deepStrictEqual(deviceDB.status, 1)
        const indexContainer = mobileID[mobileID.length - 1]
        const container = getContainer(indexContainer)
        const sock = container.get(mobileID)
        sock.write(inputChat, () => {
            /** SAVE COMMAND */
        })
    })
})


let sockets = []

function _onDataSocket(data, socket) {
    const socketAddress = socket.remoteAddress
    const socketPort = socket.remotePort
    const rawData = data.toString().trim()
    let isTAIP = false
    console.log(rawData.match(/\d/g).join("").length == 15)
    console.log(rawData, isTAIP)
}
function _onCloseSocket(socket) { }
function _onErrorSocket(socketError, socket) { }


const ServerTCP = (serverPort, serverHost) => {

    const server = createServer(Meteor.bindEnvironment((socketIn) => {

        socketIn.on('data', Meteor.bindEnvironment((data) => {
            _onDataSocket(data, socketIn)
        }))
        socketIn.on('close', Meteor.bindEnvironment(() => {
            _onCloseSocket(socketIn)
        }))
        socketIn.on('error', Meteor.bindEnvironment((socketError) => {
            _onErrorSocket(socketError, socketIn)
        }))
    }))
    server.on('close', () => {
        console.log('Server TCP Close');
        clearContainer()
    })
    server.on('error', (serverError) => {
        if (serverError.code === 'EADDRINUSE') {
            setTimeout(() => {
                server.close();
                server.listen(serverPort, serverHost, () => {
                    console.log(`ServerTCP ReUp on port ${serverPort}`)
                });
            }, 1000);
        }
    })
    server.listen(serverPort, serverHost, () => {
        console.log(`ServerTCP Up on port ${serverPort}`)
    });
}

const onDataSocket = (data, sock) => {
    const { mobileID } = PDU(data)
    if (mobileID) {
        const indexContainer = mobileID[mobileID.length - 1]
        const container = getContainer(indexContainer)
        if (!container.has(mobileID)) {
            sock['mobileID'] = mobileID
            container.set(mobileID, sock)
            console.log(sock.remoteAddress + ':' + sock.remotePort)
            console.log('Conectado:  %s', mobileID)
            DB_DevicesUpdate(mobileID, 1)
        } else {
            /**HERE DATA FREQUENCY*/
        }
        sock.write(mobileID) // Send ACK
    }
}
const onErrorSocket = (error, sock) => {
    if (sock['mobileID']) {
        const mobileID = sock['mobileID']
        console.log('Error:  %s', mobileID)
        console.log(error)
    }
}
const onCloseSocket = (sock) => {
    if (sock['mobileID']) {
        const mobileID = sock['mobileID']
        const indexContainer = mobileID[mobileID.length - 1]
        const container = getContainer(indexContainer)
        if (container.has(mobileID)) {
            container.delete(mobileID)
            console.log('Desconectado:  %s', mobileID)
            DB_DevicesUpdate(mobileID, 0)
        }
    }
}
/* Database */
const DB_DevicesUpdate = (mobileID, status) => {
    /** Status: 0 = 'offline', 1 = 'online' */
    Devices.update({ 'mobileID': mobileID }, { $set: { status } }, { upsert: true }, (error, success) => {
        if (error === null && success === 1) {
            rstream.emit('devicesUpdate')
        }
    })
}
const DB_DevicesReset = () => {
    /** Set all to offline */
    Devices.update({}, { $set: { status: 0 } }, { multi: true })
}
/* PDU (Parser) */
const PDU = (raw) => {

    const parser = (chunkraw) => {
        console.log(chunkraw)
        chunkraw = chunkraw.split(";")
        const mobileID = chunkraw[chunkraw.length - 1].match(/\d/g).join("").length == 15 ?
            chunkraw[chunkraw.length - 1].match(/\d/g).join("") : false
        // get ID
        return {
            mobileID: mobileID
        }
    }
    raw = raw.toString()
    // console.log(raw)
    raw = raw.split("\r\n")

    const { mobileID } = parser(raw[0])

    return {
        mobileID
    }

}

DB_DevicesReset()
ServerTCP(7100, '0.0.0.0')
