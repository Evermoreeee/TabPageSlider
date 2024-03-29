import Vue from 'vue';
import App from './App.vue';
import VueCompositionApi from '@vue/composition-api';

Vue.use(VueCompositionApi);

declare module '@vue/composition-api/dist/component/component' {
  interface SetupContext {
    readonly refs: { [key: string]: Vue | Element | Vue[] | Element[] };
  }
}
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
