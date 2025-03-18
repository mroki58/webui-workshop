const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());


const wsSocket = new WebSocket(`ws://localhost:8080?token=${params['token']}`)

wsSocket.onopen = (event) => {
    console.log("Sending command")
    wsSocket.send(JSON.stringify({
        command: 'hello',
        payload: 'hello from frontend',
        token: `${params['token']}`
    }));
};

wsSocket.onmessage = (event) => {
    console.log("We are here")
    console.log(JSON.parse(event.data).payload)
}