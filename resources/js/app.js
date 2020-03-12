require('./bootstrap');

window.Vue = require('vue');

import VModal from 'vue-js-modal';
Vue.use(VModal);

Vue.component('posts-list', require('./components/PostsList.vue').default);
Vue.component('upload-button', require('./components/UploadButton.vue').default);
Vue.component('upload-modal', require('./components/UploadModal.vue').default);
Vue.component('edit-modal', require('./components/EditPost.vue').default);
Vue.component('more-options-modal', require('./components/MoreOptions.vue').default);

const app = new Vue({
    el: '#app'    
});
