import 'bootstrap';
import './axios';
import Vue from 'vue';
import VModal from 'vue-js-modal';
import Vuelidate from 'vuelidate'
import store from './store';
import router from './router';
import { CHECK_AUTH } from "./store/actions.type";
import App from './components/App'

Vue.use(VModal);
Vue.use(Vuelidate)

const VueInstance = ()=>{
  new Vue({
            el: '#app',
            store ,
            router,
            ...App
        });
}

store.dispatch(CHECK_AUTH).then(()=>{
    VueInstance();
}).catch(()=>{
    VueInstance();
});