import { createServer } from 'net'
import { _ } from 'meteor/underscore'

const ServerTCP = (serverPort, serverHost) => {

    server = createServer((socketIn) => {
        socketIn.on('data', (data) => {
            PDU(data)
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
        console.log(chunkraw)
    }
    raw = raw.toString()
    // console.log(raw)
    raw = raw.split("\r\n")
    // console.log(raw)
    raw.map(element => {
        element && parser(element)
    })
}


ServerTCP(7100, '0.0.0.0')