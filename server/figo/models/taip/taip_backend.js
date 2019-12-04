import { createServer } from 'net'
import { _ } from 'meteor/underscore'




const ServerTCP = (serverPort, serverHost) => {

    server = createServer((socketIn) => {
        socketIn.on('data', (data) => {
            // console.log(data.toString())
            const { mobileID } = PDU(data)
            console.log(mobileID)

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
        // get ID
        return {
            mobileID: chunkraw[chunkraw.length - 1].match(/\d/g).join("")
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