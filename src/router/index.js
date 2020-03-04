import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Cart from "../views/Cart.vue";
import TypeShop from "../views/Type-shop.vue";
import SearchShop from "../views/Search-shop.vue";
import Detail from "../views/Detail.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/exit',
    name: 'Exit'
  },
  {
    path: '/list/:type_one',
    name: 'TypeShop',
    component: TypeShop
  },
  {
    path: '/search/:word',
    name: 'SearchShop',
    component: SearchShop
  },
  {
    path: '/detail/:Id',
    name: 'Detail',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
