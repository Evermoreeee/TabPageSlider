<template>
  <div class="home">
    <slider-page :PageList="TabsList" :TabsList='TabsList'>
      <SliderItem>
        <slider-page :PageList="TabsListt" :TabsList='TabsListt' Nesting>
          <SliderItem>
            <div>多啦A梦1</div>
          </SliderItem>
          <SliderItem>
            <slider-page :PageList="TabsLists" Nesting :TabsList='TabsLists'>
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
        <div class="dijia" style="width:80%:background:#333">四大天王2</div>
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

@Component({
  components: {
    SliderPage,
    SliderItem,
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
    {title: '大熊'},
    {title: '胖虎'},
    {title: '静香'},
    {title: '小夫'},
  ];
  public TabsLists = [
    {title: '迪迦1'},
    {title: '迪迦2'},
    {title: '迪迦3'},
  ];
  public mounted(): void {
    console.log('mounted');
  }
}
</script>
<style lang="stylus">
.home {
  height: 100%;
  width: 100%;
  background: #fff333;
}
</style>
