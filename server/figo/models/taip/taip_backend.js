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
    switch (index) {

        case "0": mobiles_0; break;
        case "1": mobiles_1; break;
        case "2": mobiles_2; break;
        case "3": mobiles_3; break;
        case "4": mobiles_4; break;
        case "5": mobiles_5; break;
        case "6": mobiles_6; break;
        case "7": mobiles_7; break;
        case "8": mobiles_8; break;
        case "9": mobiles_9; break;

    }
}

const ServerTCP = (serverPort, serverHost) => {

    server = createServer((socketIn) => {
        socketIn.on('data', (data) => {
            const { mobileID } = PDU(data)
            if (mobileID) {
                const lastNumber = mobileID[mobileID.length - 1]
                const container = getContainer(lastNumber)
                if(container.has(mobileID)){}
                else{
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