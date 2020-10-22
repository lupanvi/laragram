require('./bootstrap');
import Vue from 'vue';
import VModal from 'vue-js-modal';
import VueRouter from 'vue-router';
import router from './router';
import store from './store/index';
import { CHECK_AUTH } from "./store/actions.type";

Vue.use(VModal);
Vue.use(VueRouter);

Vue.component('upload-button', require('./components/UploadButton.vue').default);
Vue.component('more-options-modal', require('./components/MoreOptionsModal.vue').default);

/*router.beforeEach((to, from, next) => {
  Promise.all([store.dispatch(CHECK_AUTH)]).then(next) 
});*/

const app = new Vue({
    el: '#app',
    store ,
    router
});