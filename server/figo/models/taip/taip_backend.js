import { createServer } from 'net'
import { rstream } from '../../../../imports/api/streamers'
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
    const allContainers = new Map([...mobiles_0,
    ...mobiles_1,
    ...mobiles_2,
    ...mobiles_3,
    ...mobiles_4,
    ...mobiles_5,
    ...mobiles_6,
    ...mobiles_7,
    ...mobiles_8,
    ...mobiles_9])
    const allContainersArray = Array.from(allContainers)

    const allContainersArrayObject = allContainersArray.map(item => {
        return {
            mobileID: item[0],
            status: item[1]
        }
    })
    return allContainersArrayObject
}

const printContainers = () => {
    console.log('mobiles_0:', mobiles_0)
    console.log('mobiles_1:', mobiles_1)
    console.log('mobiles_2:', mobiles_2)
    console.log('mobiles_3:', mobiles_3)
    console.log('mobiles_4:', mobiles_4)
    console.log('mobiles_5:', mobiles_5)
    console.log('mobiles_6:', mobiles_6)
    console.log('mobiles_7:', mobiles_7)
    console.log('mobiles_8:', mobiles_8)
    console.log('mobiles_9:', mobiles_9)

}

rstream.on('getDevices', () => {
    rstream.emit('devices', getAllContainers())
})

const ServerTCP = (serverPort, serverHost) => {

    const server = createServer((socketIn) => {
        socketIn.on('data', (data) => {
            const { mobileID } = PDU(data)
            if (mobileID) {
                const lastNumber = mobileID[mobileID.length - 1]
                const container = getContainer(lastNumber)
                if (container.has(mobileID)) {
                    container.get(mobileID) === 'off' && console.log('Dispositivo re-conectado:', mobileID)
                    container.set(mobileID, 'on')

                } else {
                    socketIn['mobileID'] = mobileID
                    container.set(mobileID, 'on')
                    console.log('Nuevo dispositivo conectado:', mobileID)
                }
                rstream.emit('devices', getAllContainers())
            }

        })
        socketIn.on('close', () => {
            const mobileID = socketIn['mobileID'] ? socketIn['mobileID'] : false
            const container = mobileID && getContainer(mobileID[mobileID.length - 1])
            if (container && container.has(mobileID)) {
                console.log('Desconexion:  %s', socketIn['mobileID'])
                container.set(mobileID, 'off')
                rstream.emit('devices', getAllContainers())
            }
        });
        socketIn.on('error', (socketError) => {
            console.log('Error de conexion: %s ', socketIn['mobileID']);
            console.log(socketError)
        });
    })
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

const PDU = (raw) => {

    const parser = (chunkraw) => {
        // console.log(chunkraw)
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


ServerTCP(7100, '0.0.0.0')