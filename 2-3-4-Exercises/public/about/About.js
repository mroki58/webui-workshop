import Home from '../home/Home.js'

export default class About extends Home {
    constructor()
    {
        super()
        this.object = {}
        this.requestedTime = 10
    }

    getDetails()
    {
        this.requestedTime++
        this.object[this.requestedTime] = 'someStringValue' + this.requestedTime
        this.notify()
    }


}