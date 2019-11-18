import { createServer } from 'net'


const ServerTCP = (serverPort, serverHost) => {
    server = createServer((socketIn) => {
        socketIn.on('data', (data) => {
            console.log(data.toString())
        })
    })

    server.listen(serverPort, serverHost, () => {
        console.log(`ServerTCP Up on port ${serverPort}`)
    });
}


ServerTCP(4100, 'localhost')