<template>
  <div id="app">
      <div class='tab'>
        <kroute-link to='/home'>home</kroute-link>
        <kroute-link to='/my'>my</kroute-link>
      </div>
      <kroute-view></kroute-view>

      <div>{{$store.state.curre}}</div>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods: {
    log() {
      // console.log(this,'store')
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
