import Vue from 'vue'
import Vuex from 'vuex'
import { normalize, schema } from 'normalizr'
import { getField, updateField } from './Mapper'
import { normalizrMutate } from './NormalizrVuex'
import module1 from './VuexModule'

Vue.use(Vuex)

const originalData = {
  "id": "123",
  "author": {
    "id": "1",
    "name": "Paul"
  },
  "title": "My awesome blog post",
  "comments": [
    {
      "id": "324",
      "text": "text-1",
      "text2": "text-2",
      "commenter": {
        "id": "2",
        "name": "Nicole"
      },
      "tags": [
        { "id": "1", "name": 'tag1'}, { "id": "2", "name": 'tag2' }
      ]
    }
  ]
}

const user = new schema.Entity('users')
const tag = new schema.Entity('tags')

const comment = new schema.Entity('comments', {
  commenter: user,
  tags: [ tag ]
})

const article = new schema.Entity('articles', { 
  author: user,
  comments: [ comment ]
})

const normalizedData = normalize(originalData, article)
console.log(normalizedData)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: { module1 },
  state: {
    model: normalizedData,
    editCommentId: null,
    editTagId: null
  },
  getters: {
    // getField,
    // editComment: state => {
    //   return state.model.entities.comments[state.editCommentId]
    // }
  },
  mutations: {
    // updateField,
    normalizrMutate,
    setId (state, id) {
      state.editCommentId = id
    },
    setTagId (state, id) {
      state.editTagId = id
    }

  },
  actions: {

  }
})
