import { normalize, schema } from 'normalizr'


const originalData = {
    id: 1,
    childs: [
        { id: 1, name: 'child1' }, { id: 2, name: 'child2' }
    ]
}

const child = new schema.Entity('childs')

const article = new schema.Entity('module1', { 
  childs: [ child ]
})

const normalizedData = normalize(originalData, article)
console.log(normalizedData)


export default {
    namespaced: true,
    state: {
        model: normalizedData,
        editChildId: 2

    },
    mutations: {

    }
}
