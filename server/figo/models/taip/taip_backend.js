const server = require('net').createServer()
const log = (...params) => console.log(...params)

import { rstream } from '../../../../imports/api/streamers'
import { Devices } from '../../../../imports/api/collections'



function mainServerTCP(svr, port, host = '0.0.0.0') {

    //variables and constants
    const mobiles = new Map()
    const sendMobilesToWebTimer = 10 * 1000
    // Server Listen
    svr.listen(port, host)
    // Send mobiles to Web Client
    setInterval(() => {
        deliveryMobiles(Array.from(mobiles.keys()))
    }, sendMobilesToWebTimer)
    // Server on connection
    svr.addListener('connection', clientSocket => {

        clientSocket.on('data', (rawData) => {
            const { mobileID } = parseData(rawData)
            if (mobileID) {
                clientSocket.write(mobileID)
                if (!clientSocket['mobileID']) {
                    clientSocket['mobileID'] = mobileID
                    mobiles.set(clientSocket['mobileID'], mobileID)
                }
            }
        })
        clientSocket.on('close', (hadError) => {
            log('clientSocket:close:', clientSocket.mobileID, 'Error Tx:', hadError)
            if (hadError && clientSocket.mobileID) mobiles.delete(clientSocket.mobileID)
        })
        clientSocket.on('error', () => log('clientSocket:error:', clientSocket.mobileID)
        )
        clientSocket.on('end', () => log('clientSocket:end:', clientSocket.mobileID))
    })
    // Server error
    svr.addListener('error', (svrError) => {
        if (svrError.code == 'EADDRINUSE') {
            log('Address in use, retrying...')
            setTimeout(() => {
                svr.close();
                svr.listen(port, host);
            }, 1000);
        }
    })
    // Server Close
    svr.addListener('close', () => {
        log('Server TCP Close')
        setTimeout(() => {
            svr.listen(port, host);
        }, 1000);
    })

    // Process Data
    function parseData(data) {
        let unit = data.toString()
        if (unit.includes('ID=')) {
            unit = unit.split('\r\n')[0]
            unit = unit.split(';')[unit.split(';').length - 1]
            unit = unit.includes('ID=') ? unit.match(/(\d+)/)[0] : undefined
            return {
                mobileID: unit
            }
        }
        return false
    }
    // Stream
    function deliveryMobiles(mobileArray) {
        rstream.emit('deliveryMobiles', mobileArray)
    }

}



mainServerTCP(server, 7100)


