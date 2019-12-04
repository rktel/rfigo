import { createServer } from 'net'
import { _ } from 'meteor/underscore'

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

const ServerTCP = (serverPort, serverHost) => {

    server = createServer((socketIn) => {
        socketIn.on('data', (data) => {
            const { mobileID } = PDU(data)
            if (mobileID) {
                const lastNumber = mobileID[mobileID.length - 1]
                const container = getContainer(lastNumber)
                if (container.has(mobileID)) { }
                else {
                    socketIn['mobileID'] = mobileID
                    container.set(mobileID, socketIn)
                }
            }

        })
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