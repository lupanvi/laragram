import 'bootstrap';
import './axios';
import Vue from 'vue';
import VModal from 'vue-js-modal';
import VueRouter from 'vue-router';
import store from './store';
import router from './router';
import { CHECK_AUTH } from "./store/actions.type";

Vue.use(VModal);
Vue.use(VueRouter);

Vue.component('upload-button', require('./components/UploadButton.vue').default);
Vue.component('more-options-modal', require('./components/MoreOptionsModal.vue').default);

store.dispatch(CHECK_AUTH);

const app = new Vue({
    el: '#app',
    store ,
    router
});

