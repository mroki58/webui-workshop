import {Observable, RemoteData} from '/js/src/index.js'

export const getStatusOfLoading = (remoteData) => 
{
    return remoteData.match({
    NotAsked: () => 'Data has not been fetched from the server', // Display a message to the user saying that data has not been fetched
    Loading: () => 'Loading, please wait', // A request has probably been sent to the server but we did not receive any response yet
    Success: (res) => `Data loaded!`, // The server response has been stored in the remote data payload, and it is passed as parameter to the Success callback
    Failure: (error) => `An error has occurred: ${error.message}`, // An error has occurred, displays its message
    })
}


export default class About extends Observable {
    constructor(loader)
    {
        super()
        this.object = {}
        this.requestedTime = 10

        // loader from Model class
        this.loader = loader

        this.remoteData = RemoteData.NotAsked()
    }


    getDetails()
    {
        this.remoteData = RemoteData.loading()
        this.notify()

        this.loader.get("/api/info")
        .then((res) => {
            this.object = res.result
            this.remoteData = RemoteData.success()
            this.notify()
        })
        .catch((err) => {
            this.remoteData = RemoteData.failure()
            this.notify()
        })
    }
}