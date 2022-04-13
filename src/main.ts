import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import { baseUrl } from './config/axios';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { BootstrapVue } from 'bootstrap-vue';
import VueApexCharts from 'vue-apexcharts';
import Notifications from 'vue-notification';
import VueContentPlaceholders from 'vue-content-placeholders';
import VueGoodTablePlugin from 'vue-good-table';
import VueSweetalert2 from 'vue-sweetalert2';
import 'vue-good-table/dist/vue-good-table.css';

import moment from 'moment';
import vSelect from 'vue-select';
import VCalendar from 'v-calendar';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
// import 'vue-select/src/scss/vue-select.scss';
import 'vue-select/dist/vue-select.css';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(BootstrapVue);
Vue.use(VueContentPlaceholders);
Vue.use(VueApexCharts);
Vue.use(Notifications);
Vue.use(VueSweetalert2);
Vue.use(VCalendar, {
  componentPrefix: 'v'
});
Vue.component('v-select', vSelect);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('apexchart', VueApexCharts);
Vue.component('date-picker', DatePicker);
Vue.use(VueGoodTablePlugin);
Vue.prototype.moment = moment;
Vue.config.productionTip = false;

// Axios Configuration
axios.defaults.baseURL = baseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/json';
if (store.getters['user/TOKEN'] !== '') {
  axios.defaults.headers.common.Authorization = `${store.getters['user/TOKEN']}`;

  axios.interceptors.request.use(function(config) {
    return new Promise((resolve) => setTimeout(() => resolve(config), 500));
  });

  axios.interceptors.response.use(
    function(response) {
      if (response.status !== 201) {
        Vue.notify({
          group: 'request',
          title: 'Successfully',
          type: 'success',
          text: response.data.message,
          duration: 5000
        });
      }
      return response;
    },
    function(error) {
      const errorMessage = error.response.data.message;
      Vue.notify({
        group: 'request',
        title: 'Request failed',
        type: 'error',
        text: errorMessage
          ? errorMessage
          : 'No network, please check your connection',
        duration: 5000
      });
      return Promise.reject(error);
    }
  );
}

new Vue({
  router,
  store,
  render: (h): any => h(App)
}).$mount('#app');
