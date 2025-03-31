import {h} from '/js/src/index.js'
import {info, iconPerson} from '/js/src/icons.js'


const label = (model) => {
  return h('p', {class: 'bg-success text-center'}, model.homeModel.getUserName())
}

export default (model) => {
    return h('.content' , 
        [ h('h1', {class: 'title'}, 'hello home!'),
          h('button', {class: 'btn btn-primary' , 
            onclick: () => {
                console.log("Takes user to about page")
                model.router.go('?page=about')
              }
          }, [
            'About',
            info()
          ]),
          h('button', {class: 'btn btn-danger',
            onclick: () => {
                console.log('Gets username')
                model.homeModel.setUserName()
            }

          }, [
            iconPerson()
          ]),
          label(model)
    ])
}

