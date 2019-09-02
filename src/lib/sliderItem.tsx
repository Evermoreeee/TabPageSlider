
import { Component, Vue, Prop } from 'vue-property-decorator';
import style from './slider.module.less';

@Component
export default class SliderItem extends Vue {
    @Prop(Number) public sitem !: number;
    @Prop(String) public acwidth !: string;
    get getAcwidth() {
        return `width:${this.acwidth}`;
    }
    public render() {
        return (
            <div class={style.sliderItem} style={this.getAcwidth}>
                {
                    this.$slots.default
                }
            </div>
        );
    }
}

