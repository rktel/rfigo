import { createServer } from 'net'
import { _ } from 'meteor/underscore'




const ServerTCP = (serverPort, serverHost) => {

    server = createServer((socketIn) => {
        socketIn.on('data', (data) => {
            console.log(data.toString())
            PDU(data)
        })
    })

    server.listen(serverPort, serverHost, () => {
        console.log(`ServerTCP Up on port ${serverPort}`)
    });
}



const PDU = (raw) => {
    // one raw
    const parser = (chunkraw) => {
        // console.log(chunkraw)
        chunkraw = chunkraw.split(";")
        // get ID
        const mobeliID = chunkraw[chunkraw.length -1].match(/\d/g).join("")
        console.log(chunkraw[chunkraw.length -1])
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