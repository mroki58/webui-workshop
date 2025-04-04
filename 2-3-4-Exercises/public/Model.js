import {Observable, QueryRouter, Loader, sessionService, WebSocketClient} from '/js/src/index.js';
import Home from './home/Home.js'
import About from './about/About.js';

/**
 * Root of model tree
 * Handle global events: keyboard, websocket and router location change
 */
export default class Model extends Observable {
  /**
   * Load all sub-models and bind event handlers
   */
  constructor() {
    super();

    this.session = sessionService.get();
    this.session.personid = parseInt(this.session.personid, 10);

    this.loader = new Loader(this);
    this.loader.bubbleTo(this);

    // Setup router
    this.router = new QueryRouter();
    this.router.observe(this.handleLocationChange.bind(this));
    this.router.bubbleTo(this);

    // models
    this.homeModel = new Home(this.loader)
    this.aboutModel = new About(this.loader)

    this.homeModel.bubbleTo(this)
    this.aboutModel.bubbleTo(this)

    // ws client
    this.randomNumber = 10
    this.ws = new WebSocketClient()

    this.ws.addListener('authed', () => {
      this.ws.sendMessage({command: 'random', payload: {data: 0}});
    })

    this.ws.addListener('command', (message) => {
      if(message.command == 'random-res')
      {
        console.log( this.randomNumber)
        this.notify()
        this.ws.sendMessage({
          command: 'random',
          payload: {data: 0}
        })
      }
    }) 

    this.handleLocationChange(); // Init first page
  }

  /**
   * Delegates sub-model actions depending on new location of the page
   */
  handleLocationChange() {
    switch (this.router.params.page) {
      case 'home':
        break;
      case 'about':
        break;
      default:
        this.router.go('?page=home');
        break;
    }
  }

}
