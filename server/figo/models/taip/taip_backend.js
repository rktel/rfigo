const server = require('net').createServer()
const log = (...params) => console.log(...params)

import { rstream } from '../../../../imports/api/streamers'
import { Devices } from '../../../../imports/api/collections'

function mainServerTCP(svr, port, host = '0.0.0.0') {
    let mainTimeCounter = 0
    // Server Listen
    svr.listen(port, host)
    // Server on connection
    svr.addListener('connection', clientSocket => {
        svr.getConnections((getConnectionsError, countClients) => log(`clientSocket connections: ${countClients}`))
        setInterval(() => {
            mainTimeCounter++
            if (mainTimeCounter == 10) {
                log('OFF', new Date().toISOString())
                clientSocket.destroy()
                mainTimeCounter = 0
            }
        }, 1000)

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

}



mainServerTCP(server, 7100)


