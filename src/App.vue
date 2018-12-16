<template>
  <div id="app">
    <input type="text" v-model="text" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'app',
  computed: {
    ...mapGetters([ 'editComment' ]),
    text: {
      get () {
        return this.editComment.text
      },
      set (value) {
        this.setNorm({ key: 'text', type: 'comments' , value })
      }
    }
  },
  methods: {
    ...mapMutations([ 'setNorm' ])
  }
  // mounted () {
  //   console.log(this.editComment, this.text)
  // }
}
</script>

<style>
</style>
