// Your code goes here
import {HttpServer, O2TokenService, WebSocket, WebSocketMessage, LogManager} from '@aliceo2/web-ui'

const wsLogger = LogManager.getLogger('frontend/ws')

const http = new HttpServer({
    port: 8080
}, {
    expiration: '30s'
})

http.addStaticPath('./public')

http.get('/hello', (req, res) => {
    res.json({msg: 'hello api'})
}, {
    public: true
})

http.get('/hi', (req, res) => {
    res.json({msg: 'hello jsonwebtoken'})
})

const ws = new WebSocket(http)


ws.bind('hello', (message) => {
    wsLogger.info(message.payload);
    return new WebSocketMessage().setCommand('hello-back').setPayload('hello back');
});