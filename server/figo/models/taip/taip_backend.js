const server = require('net').createServer()
const log = (...params) => console.log(...params)

import { rstream } from '../../../../imports/api/streamers'
import { Devices } from '../../../../imports/api/collections'

function mainServerTCP(svr, port, host = '0.0.0.0') {
    // Server Listen
    svr.listen(port, host)
    // Server on connection
    svr.addListener('connection', clientSocket => {
        svr.getConnections((getConnectionsError, countClients) => log(`clientSocket connections: ${countClients}`))
        clientSocket.on('data', (rawData) => {
            const { mobileID } = parseData(rawData.toString())
            if (mobileID) {
                clientSocket.write(mobileID)
            }
        })
        clientSocket.on('error', (socketError) => { })
        clientSocket.on('close', () => { })
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
        if (data.includes('ID=')) {
            const splitData = data.split('\r\n')[0]
            const lastField = splitData.split(';')[splitData.split(';').length - 1]
            const imei = lastField.match(/(\d+)/)
            return {
                mobileID: imei[0]
            }
        }
        return false
    }

}



mainServerTCP(server, 7100)


