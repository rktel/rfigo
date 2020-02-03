const server = require('net').createServer()
const log = (...params) => console.log(...params)

import { rstream } from '../../../../imports/api/streamers'
import { Devices } from '../../../../imports/api/collections'

function mainServerTCP(svr, port, host = '0.0.0.0') {
    svr.listen(port, host)
    svr.addListener('connection', clientSocket => {
        svr.getConnections((getConnectionsError, countClients) => log(`Connections number: ${countClients}`))
    })
}

mainServerTCP(server, 7100)
