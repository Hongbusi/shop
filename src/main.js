import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/style.css";

// iView
import {
  Icon,
  Message,
  Carousel,
  CarouselItem,
  BackTop,
  Input,
  Button,
  Rate
} from 'view-design';
Vue.component('Icon', Icon);
Vue.prototype.$Message = Message
Vue.component('Carousel', Carousel);
Vue.component('CarouselItem', CarouselItem);
Vue.component('BackTop', BackTop);
Vue.component('Input', Input);
Vue.component('Button', Button);
Vue.component('Rate', Rate);


import 'view-design/dist/styles/iview.css';

// vant
import {
  Lazyload
} from 'vant';
Vue.use(Lazyload);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')