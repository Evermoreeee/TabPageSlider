<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <!-- <Home></Home> -->
    <!-- <fn-api name='cc' :options='options' @option-click='optionClick'></fn-api> -->
    <CcComtainer name='CCc' @increment='increment'></CcComtainer>
    <!-- <list></list> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Home from './Home.vue';
import FnApi from './lib/FnApi'
import CcComtainer from './lib/FnApijs'
import list from './lib/list.vue'
// import HelloWorld from './components/HelloWorld.vue';
@Component({
  components: {
    Home,
    FnApi,
    CcComtainer,
    list
    // HelloWorld,
  },
})
export default class App extends Vue {
  public _azhuang = [
    { title: '爱你', count: 99 },
    { title: '在心', count: 21 },
    { title: '口难开', count: 32 }
  ]
  public optionClick(q:any){
    console.log('111')
  }
  increment(){
    console.log('131313')
  }
}
</script>
<style lang="stylus">
#app
  height 100%
  
</style>
