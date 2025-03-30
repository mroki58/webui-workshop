import {Observable} from '/js/src/index.js'

export default class Home extends Observable{
    constructor()
    {
        super()
        this.userName = 'username'
    }

    getUserName()
    {
        return this.userName
    }

    setUserName()
    {
        this.userName = 'Igor'
        this.notify()
    }

}
