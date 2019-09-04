<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <Home></Home>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Home from './Home.vue';
// import HelloWorld from './components/HelloWorld.vue';
@Component({
  components: {
    Home,
    // HelloWorld,
  },
})
export default class App extends Vue {}
</script>
<style lang="stylus">
#app
  height 100%
  
</style>
