import { createServer } from 'net'
import { _ } from 'meteor/underscore'




const ServerTCP = (serverPort, serverHost) => {

    server = createServer((socketIn) => {
        socketIn.on('data', (data) => {
            // console.log(data.toString())
            const { mobileID } = PDU(data)
            mobileID && console.log(mobileID)
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

    return { mobileID: mobileID }
}


ServerTCP(7100, '0.0.0.0')