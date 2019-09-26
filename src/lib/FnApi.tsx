import { ref, computed, watch, onMounted, Ref, createComponent } from '@vue/composition-api';
import { PropType } from 'vue';
import style from './slider.module.less';

interface FnListType {
    title: string;
    count: number;
}
interface Props {
    name: string;
}
export default createComponent({
    props: {
        name: String,
        options: (Array as any) as PropType<{title: string, count?: number}>,
    },
    setup( props: any, setupContext: any, {root}) {
      const count: Ref<number> = ref(0);
      const refs = setupContext.refs;
    //   const MatchList: FnListType = {
    //     title: 'nani', count: 9,
    //   };
      // computed
      const plusOne = computed(() => count.value + 1);
      // method
      const increment = () => {
        count.value++;
        console.log(root);
        // emit('option-click', 1);
      };
      // watch
      watch(() => count.value * 2, (val: any) => {
        // console.log(`count * 2 is ${val}`);
      });
          // lifecycle
      onMounted(() => {
        // console.log('onMounted');
        // console.log(refs.setupContext);
      });
          // expose bindings on render context
      return {
        initProps: props,
        count,
        plusOne,
        increment,
        msg: `hello ${props.name}`,
      };
    },
    render() {
      const CcList = this.initProps.options.map((item: any) => {
        return (
            <div >
                Cc:{item.title} <span>🌟🌟{item.count}</span>
            </div>
        );
      });
      console.log();
      return (
        <div class={style.hooksOne} ref='setupContext'>
            <h2>{ this.msg }</h2>
            <p >count is { this.count }</p>
            <p>plusOne is { this.plusOne }</p>
            { CcList }
            <button on-click={this.increment}>count++</button>
        </div>
      );
    },
  });
