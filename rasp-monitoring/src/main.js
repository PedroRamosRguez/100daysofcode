import '@babel/polyfill';
import Vue from 'vue';
import './plugins/bootstrap-vue';
import App from './App.vue';
import router from './router';
import slVueTree from 'sl-vue-tree';
import 'sl-vue-tree/dist/sl-vue-tree-dark.css';
import 'chartjs-plugin-labels';
import Vuex from 'vuex'
Vue.component('sl-vue-tree',slVueTree);
Vue.config.productionTip = false;
Vue.use(VueChartkick);
Vue.use(Vuex);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
