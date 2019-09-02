
import { Component, Vue , Prop, Emit, Watch} from 'vue-property-decorator';

@Component
export default class TodoItem extends Vue {
    public i: number = 1;
    @Prop(Number) public PageSize !: number;
    @Emit('say')
    public saveSay() {
        return 'hello';
    }
    @Watch('i')
    public fn(): void {
        // console.log('i变化了');
    }
    public increment() {
        this.i += 1;
    }
    public render() {
        return (
            <div class=''>
                <div></div>
            </div>
        );
    }
}
