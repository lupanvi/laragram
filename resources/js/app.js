require('./bootstrap');
import Vue from 'vue';
import VModal from 'vue-js-modal';
import VueRouter from 'vue-router';
import router from './router';

Vue.use(VModal);
Vue.use(VueRouter);

Vue.component('upload-button', require('./components/UploadButton.vue').default);
Vue.component('more-options-modal', require('./components/MoreOptions.vue').default);

const app = new Vue({
    el: '#app',
    router
});