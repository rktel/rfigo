const server = require('net').createServer()
const log = (...params) => console.log(...params)

import { rstream } from '../../../../imports/api/streamers'
import { Devices } from '../../../../imports/api/collections'

function mainServerTCP(svr, port, host = 'localhost') {
    svr.listen(port, host)
    svr.addListener('connection', clientSocket => {
        log('Conectado', svr.connections)
    })
}

mainServerTCP(server, 7100)