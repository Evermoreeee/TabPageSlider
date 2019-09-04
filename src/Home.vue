<template>
  <div class="home">
              
    <slider-page :PageList="TabsList" :TabsList='TabsList' :threshold=0.3>
      <SliderItem>
        <slider-page :PageList="TabsListt" :TabsList='TabsListt' Nesting :threshold=0.3>
          <SliderItem>
            <scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
                <div class="duola" v-for="(item,index) in 30" :key="index" @click="hendleClick(index)"> 
                  多啦A梦{{index}}
                </div>
            </scroll>
          </SliderItem>
          <SliderItem>
            <slider-page 
              :PageList="TabsLists" 
              Nesting 
              :TabsList='TabsLists'
              :threshold=0.3
              >
              <SliderItem>
                <div class="dijia" style="width:80%:background:#333">迪迦奥特曼1</div>
              </SliderItem>
              <SliderItem>
                <div class="dijia" style="width:80%:background:#333">迪迦奥特曼2</div>
              </SliderItem>
              <SliderItem>
                <div class="dijia" style="width:80%:background:#333">迪迦奥特曼3</div>
              </SliderItem>
            </slider-page>
          </SliderItem>
          <SliderItem>
            <div>多啦A梦3</div>
          </SliderItem>
          <SliderItem>
            <div>多啦A梦4</div>
          </SliderItem>
        </slider-page>
      </SliderItem>
      <SliderItem>
        <div class="dijia" style="width:80%:background:#333"> 
          <FnApi></FnApi>
        </div>
      </SliderItem>
      <SliderItem>
        <div class="dijia" style="width:80%:background:#333">四大天王3</div>
      </SliderItem>
      <SliderItem>
        <div class="dijia" style="width:80%:background:#333">四大天王4</div>
      </SliderItem>
    </slider-page>
  </div>
</template>

<script lang="ts">
interface PageList {
  text: string;
  component: boolean;
}
import { Component, Vue } from 'vue-property-decorator';
import SliderPage from './lib/sliderPage';
import SliderItem from './lib/sliderItem';
import scroll from './lib/scroll.vue'
import FnApi from './lib/FnApi'
@Component({
  components: {
    SliderPage,
    SliderItem,
    scroll,
    FnApi
  },
})
export default class Home extends Vue {
  // 初始化数组
  public PageList: PageList[] = [
    { text: '1', component: true },
    { text: '2', component: true },
    { text: '3', component: true },
  ];
  public TabsList = [
    {title: '刘德华'},
    {title: '张学友'},
    {title: '郭富城'},
    {title: '黎明'},
  ];
  public TabsListt = [
    {title: '大雄'},
    {title: '胖虎胖虎'},
    {title: '静香'},
    {title: '夫'},
  ];
  public TabsLists = [
    {title: '迪迦1'},
    {title: '迪迦2'},
    {title: '迪迦3'},
  ];
  public mounted(): void {
    console.log('mounted');
  }
  onRefresh(done:Function) {
        setTimeout(() => {
          done()
        }, 1500)
  }
  hendleClick(index:Number):void{
    console.log(index)
  }
  onInfinite(done:Function) {
        setTimeout(() => {
          done()
        }, 1500)
      }
}
</script>
<style lang="less">
.home {
  height: 100%;
  width: 100%;
  background: #fff333;
  .scroll{
    // height: 100%;
    // overflow: hidden;
    // overflow-y: auto;
  }
  .duola{
    height: 40px;
    line-height: 40px;
    background: #fd42c5;
    border-bottom: 2px solid #333;
  }
}
#app{
  height: 100%;
}

body{
    margin :0 ;
    padding: 0;
    height: 100vh;
    width: 100vw;
  }
</style>
