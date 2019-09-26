import { ref, computed, watch, onMounted, Ref, createComponent } from '@vue/composition-api';
import style from './slider.module.less';

const CcComtainer = {
    props:{
        name:{
            type:String
        }
    },
    setup(props,{emit,root,parent}){
      const count = ref(0);
      const list = [1,2,3,4,5,6,7,8,9,0]
    //   const MatchList: FnListType = {
    //     title: 'nani', count: 9,
    //   };
      // computed
      const plusOne = computed(() => count.value + 1);
      // method
      const increment = () => {
        count.value++;
        // emit('option-click', 1);
        console.log(parent);
        emit('increment')
      };
      // watch
      watch(() => count.value * 2, (val) => {
        // console.log(`count * 2 is ${val}`);
      });
          // lifecycle
      onMounted(() => {
        // console.log('onMounted');
        // console.log(refs.setupContext);
      });
          // expose bindings on render context
      return {
        list,
        initProps: props,
        count,
        plusOne,
        increment,
        msg: `hello ${props.name}`,
      };
        
    },
    render() {
        const self = ((index)=>{
          if(index>5){
            return <div>{index}</div>
          }
        })
        return (
            <div class={style.hooksOne} ref='setupContext'>
                <h2>{ this.msg }</h2>
                {
                  this.list.map(item => {
                    self(item)
                  })
                }
                <p >count is { this.count }</p>
                <p>plusOne is { this.plusOne }</p>
                <button on-click={this.increment}>count++</button>
            </div>
        );
    }
}

export default CcComtainer;