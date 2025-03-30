import {h} from '/js/src/index.js'
import {iconHome, iconList} from '/js/src/icons.js'
import { getStatusOfLoading } from './About.js'

const label = (model) => {
    return h('p', {class: 'bg-success text-center'}, getStatusOfLoading(model.aboutModel.remoteData))
}


const tableContent = (model) => {
    return Object.keys(model.aboutModel.object).map((value) => {
        return h('tr', [
            h('td', value),
            h('td', model.aboutModel.object[value])
        ])
    })
} 

const table = (model) => {
    return h('table', {class: 'table'}, [
        h('thead',[h('th', 'name'), h('th', 'value')]),
        h('tbody', [...tableContent(model)])
    ])
}

export default (model) => {
    return h('.content' , [
        label(model),
        h('h1', {class: ''}, 'hello about!'),
        h('button', {class: 'btn btn-primary', 
            onclick: () => {
                console.log('Takes user to home page')
                model.router.go('?page=home')
            }
        }, ['Home', iconHome()]),
        h('button', { class: 'btn btn-danger',
            onclick: () => {
                console.log('Request data about application')
                model.aboutModel.getDetails()
            },
        }, iconList() ),
        table(model),
    ])
}
