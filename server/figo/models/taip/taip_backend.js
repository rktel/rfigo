import { createServer } from 'net'
import { _ } from 'meteor/underscore'




const ServerTCP = (serverPort, serverHost) => {

    server = createServer((socketIn) => {
        socketIn.on('data', (data) => {
            // console.log(data.toString())
            PDU(data)
           
        })
    })

    server.listen(serverPort, serverHost, () => {
        console.log(`ServerTCP Up on port ${serverPort}`)
    });
}



const PDU = (raw) => {
    // one raw
    let mobileID = null

    const parser = (chunkraw) => {
        // console.log(chunkraw)
        chunkraw = chunkraw.split(";")
        // get ID
        mobeliID = chunkraw[chunkraw.length - 1].match(/\d/g).join("")
    }
    raw = raw.toString()
    // console.log(raw)
    raw = raw.split("\r\n")
    // console.log(raw)
    raw.map(element => {
        element && parser(element)
    })

    console.log(mobileID)
}


ServerTCP(7100, '0.0.0.0')