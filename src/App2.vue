<template>
  <div id="app">
    <input type="text" v-model="text" />
    <pre v-text="text"></pre>
    <br>
    <input type="text" v-model="text2" />
    <pre v-text="text2"></pre>
    <br>
    <br>
    <button @click="set(324)" v-if="!editCommentId">Set</button>
    <button @click="set()" v-if="editCommentId">Clr</button>
    <button @click="localEditCommentId = 324" v-if="!localEditCommentId">Set local</button>
    <button @click="localEditCommentId = null" v-if="localEditCommentId">Clr local</button>
    <hr>
    <input type="text" v-model="name" v-if="editTagId" />
    <pre v-text="name" v-if="editTagId"></pre>
    <br>
    <button @click="setTag(1)" v-if="!editTagId">Set</button>
    <button @click="setTag()" v-if="editTagId">Clr</button>
    <hr>
    <input type="text" v-model="rennamem1" />
    <pre v-text="rennamem1"></pre>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { normalizrFactory, normalizrFactoryM } from './NormalizrVuex'

const comment = normalizrFactory('model', 'comments', c => c.localEditCommentId)
const tag = normalizrFactory('model', 'tags', 'editTagId')

const module1 = normalizrFactory('model', 'childs', 'editChildId', 'module1')

export default {
  data () {
    return {
      localEditCommentId: null
    }
  },
  computed: {
    ...mapState([ 'editCommentId', 'editTagId' ]),
    ...comment([ 'text', 'text2' ]),
    ...tag([ 'name' ]),
    ...module1({ rennamem1: 'name' })
  },
  methods: {
      set (id) {
          this.$store.commit('setId', id)
      },
      setTag (id) {
          this.$store.commit('setTagId', id)
      }
  },
  mounted () {
      this.set(324)
  }
}
</script>

<style>
</style>
