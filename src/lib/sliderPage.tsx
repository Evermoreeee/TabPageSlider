
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
import style from './slider.module.less';
import SliderItem from './sliderItem';

interface PageListType {
  text: number;
  component: boolean;
}
interface TabsListType {
  title: string;
}
@Component({
  components: {
    SliderItem,
  },
})
export default class SliderPage extends Vue {
  /**
   * @private 滑动到计算属性
   */
  get Transation() {
    // return 'transform = 'translateX' + "(" + this.states.left + "px)';
    return `transform:translateX(${this.move}px)`;
  }
  get ItemWidth() {
    try {return this.$children[0].$el.offsetWidth; } catch {throw new Error('获取滑块宽度失败'); }
  }
  get activeTab() {
    // 3 0.1  4 0.2
    const len = this.TabsList[this.stateInit.index].title.length;
    const width = 100 / this.TabsList.length * len * this.threshold;
    const left  = 100 / this.TabsList.length * (1 - (len * this.threshold)) / 2;
    return `transform:translateX(${-this.move / this.TabsList.length}px);
            width:${width}%;left:${left}%;
            `;
  }
  //  @Prop(Number) public PageSize !: number;
  @Prop(Array) public PageList!: PageListType[];
  @Prop(Array) public TabsList!: TabsListType[];
  @Prop(Number)public threshold!: number;
  @Prop(Boolean) public Nesting !: false;
  public parentSlider: object = {};
  public value: any = 1;
  // @Prop(Object) public Options!: OptionType;
  public move: number = 0;
  public direction: string = 'horizontal'; // 滑动方向

  public startX !: number;
  public startY !: number;
  public stateInit = {
    index: 0, // 当前滑块的下标，从0开始
    left: 0, // container的一个left位置
    touch: 0, // 触摸状态 0：未触摸 1：手指触摸/鼠标按下
    touchTrack: {
      start: {
        pageX: 0,
      }, // 手指触摸/鼠标按下时的位置
      old: {
        pageX: 0,
      }, // 手指/鼠标上一次的位置
    },
  };

  @Watch('value')
    public fn(): void {
        console.log(this.value);
  }
  /**
   * @public 开始滑动
   * @param {*} event 滑动event
   */
  public touchStart(event: any): void {

    this.resetTouchStatus();
    // 阻止浏览器默认的拖拽行为

    event.preventDefault();
    this.stateInit.touch = 1;
    this.stateInit.touchTrack.start = this.stateInit.touchTrack.old = event.touches
      ? event.touches[0]
      : event;
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
  }
  public _$touchMove(event: any) {
    const touch = event;
    const deltaX = touch.clientX - this.startX;
    const deltaY = touch.clientY - this.startY;
    const  offsetX = Math.abs(deltaX);
    const  offsetY = Math.abs(deltaY);

    this.direction = this.getDirection(offsetX, offsetY);
  }
  public touchMove(event: any) {

    // console.log(event);
    // 必须是手指/鼠标按下了才允许移动
    if (this.stateInit.touch !== 1) { return; }
    // this.touchMove(event);
    // event.preventDefault();
    try {
      event.stopPropagation();
    } catch {
      console.warn('stopPropagation');
    }

    // 触摸和鼠标事件event不一样，要区分开来。
    event = event.touches ? event.touches[0] : event;
    this._$touchMove(event);
    if (this.direction !== 'horizontal') {
      return;
    } else {
      // 纵向滑动
    }
    // event.pageX表示当前手指/鼠标所移动的位置
    // 而我们this.states.touchTrack.old表示手指/鼠标的上一个位置
    // 所以可以通过比对来判断是向左滑动还是向右滑动

    if (event.pageX < this.stateInit.touchTrack.old.pageX) {
      this.stateInit.left -= this.stateInit.touchTrack.old.pageX - event.pageX;
    } else {
      this.stateInit.left += event.pageX - this.stateInit.touchTrack.old.pageX;
    }
    this.stateInit.touchTrack.old = event;

    const $Maxleft = -(this.ItemWidth * (this.PageList.length - 1));

    if (this.stateInit.left < 0 && $Maxleft < this.stateInit.left) {
      this.move = this.stateInit.left;
    } else {
      // throw new Error('越界了');
      // 如果是嵌套滑动，越界时就寻找 $parent 看是否拥有父类
      if (this.Nesting) {
        this.parentSlider.touchMove(event);
      }
    }
  }
  public touchEnd(event: any): void {
    try {
      event.stopPropagation();
    } catch {
      console.warn('stopPropagation');
    }
    if (this.direction !== 'horizontal') {
      return;
    } else {
      // zongxinag
    }
    // 移除触摸状态
    this.stateInit.touch = 0;
    event = event.changedTouches ? event.changedTouches[0] : event;

    if (event.pageX < this.stateInit.touchTrack.start.pageX) {
      this.stateInit.index++;
    } else {
      this.stateInit.index--;
    }
    // 防止滑块溢出
    if (this.stateInit.index < 0) {
      this.stateInit.index = 0;
      if (this.Nesting && this.direction === 'horizontal') {
        this.parentSlider.touchEnd(event);
      }

    } else if (this.stateInit.index > this.PageList.length - 1) {
      this.stateInit.index = this.PageList.length - 1;

      if (this.Nesting && this.direction === 'horizontal') {
        this.parentSlider.touchEnd(event);
      }
    }
    if (this.direction === 'horizontal') {
      this.change(this.stateInit.index);
    } else {
      // 垂直滚动
      return;
    }
  }
  public change(index: number) {
    // 当前滑块的index乘以滑块宽度的相反数即为container的left位置。
    this.stateInit.left = -(this.ItemWidth * index);
    this.move = this.stateInit.left;
    this.stateInit.index = index;
  }
  /**
   * @public 滑动到方向
   * @param {number} x offsetX
   * @param {number} y offsetY
   * @returns {string} 返回horizontal横向/vertical纵向
   */
  public getDirection(x: number, y: number): string {
    const MIN_DISTANCE: number = 20;
    if (x > y && x > MIN_DISTANCE) {
      return 'horizontal';
    }
    if (y > x && y > MIN_DISTANCE) {
      return 'vertical';
    }
    return '';
  }
  /**
   * @private 重置滑动参数
   */
  public resetTouchStatus(): void {
    this.direction = '';
    // this.deltaX = 0;
    // this.deltaY = 0;
  }

  public mounted(): void {
    // console.log('mounted');
    // 检测是在pc端还是移动端
    let isTouch: boolean;
    isTouch = 'ontouchstart' in window;
    // console.log(this);
    // 如过允许嵌套滑动，先找到父类
    if (this.Nesting) {
      let parent = this.$parent;
      let parentSlider = null;
      while (parent) {
        if (parent.$options._componentTag === 'slider-page' || parent.$options._componentTag === 'SliderPage') {
          parentSlider = parent;
          break;
        } else {
          parent = parent.$parent;
        }
      }
      if (parentSlider === null) {
        console.warn('ToT。没有找到父类实例...');
      } else {
        console.log(parentSlider);
        this.parentSlider = parentSlider;
      }
    }
  }
  protected render() {

    return (
      <div class={style.sliderPage}>
        <div class='tab-comtainer'>
          {
            this.TabsList.map((item, index) => {
              return (
                <div class='tab-item' style={index === this.stateInit.index ? 'color:red;' : ''}>
                  {item.title}
                </div>
              );
            })
          }
          <div class='tab-active' style={this.activeTab}></div>
        </div>
        <div  style={this.Transation}
              class='container'
              ref='SliderItem'
              on-touchstart={this.touchStart.bind(this)}
              on-touchmove={this.touchMove}
              on-touchend={this.touchEnd}
              nativeOn={{click: (e: any) => {console.log(111); }}}
              >
                {this.$slots.default}
        </div>
      </div>
    );
  }
}
