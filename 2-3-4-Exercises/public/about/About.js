import {Observable} from '/js/src/index.js'

export default class About extends Observable {
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