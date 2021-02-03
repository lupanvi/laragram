import 'bootstrap';
import './axios';
import Vue from 'vue';
import VModal from 'vue-js-modal';
import store from './store';
import router from './router/router';
import { CHECK_AUTH } from "./store/actions.type";

Vue.use(VModal);

Vue.component('upload-button', require('./components/UploadButton.vue').default);
Vue.component('more-options-modal', require('./components/MoreOptionsModal.vue').default);

const VueInstance = ()=>{
  new Vue({
            el: '#app',
            store ,
            router
        });
}

store.dispatch('checkAuth').then(()=>{
    VueInstance();
}).catch(()=>{
    VueInstance();
});

