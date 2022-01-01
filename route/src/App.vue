<template>
  <div id="app">
      <div class='tab'>
        <kroute-link to='/home'>home</kroute-link>
        <kroute-link to='/my'>my</kroute-link>
      </div>
      <kroute-view></kroute-view>
      <div @click="log">commit</div>
      <div>{{$store.state.curre}}</div>
      <div>{{$store.getters.computedData}}</div>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {

  },
  methods: {
    log() {
      // debugger
      this.$store.dispatch('setState')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.tab {
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin: 0 auto;
}
</style>
