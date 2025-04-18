const path = require('path');
const config = require('./config.js');
const applicationService = require('./lib/applicationService.js')


const {HttpServer} = require('@aliceo2/web-ui');
const {WebSocket, WebSocketMessage} = require('@aliceo2/web-ui');


const http = new HttpServer(config.http, config.jwt, config.oAuth);
http.addStaticPath(path.join(__dirname, 'public'));

http.get('/info', (req, res) => {
    res.json(
       applicationService.getInfo()
    )
}, {
    //public: true,
})

const ws = new WebSocket(http)


function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

ws.bind('random', async (req, res) => {
    // await timeout(5000)
    return new WebSocketMessage().setCommand('random-res').setPayload({data: Math.floor(Math.random() * 9 + 1)})
})