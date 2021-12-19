<template>
  <div id="app">
      <div class='tab'>
        <kroute-link to='/home'>左边</kroute-link>
        <kroute-link to='/my'>右边</kroute-link>
      </div>
      <kroute-view>1</kroute-view>
  </div>
</template>

<script>
import my from "./components/my.vue";
export default {
  name: 'App',
  components: {
    my
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
