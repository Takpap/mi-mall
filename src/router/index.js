import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Index from '../pages/Index.vue'
import Detail from '../pages/Detail.vue'
import Order from '../pages/Order.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/index',
  name: 'home',
  component: Home,
  children: [{
    path: 'index',
    name: 'index',
    component: Index
  }, {
    path: 'product/:id',
    name: 'product',
    component: () => import('../pages/Product.vue'),
  }, {
    path: 'detail/:id',
    name: 'detail',
    component: Detail
  }, ]
}, {
  path: '/cart',
  name: 'cart',
  component: () => import('../pages/Carter.vue'),
}, {
  path: '/order',
  name: 'order',
  component: Order,
  children: [{
    path: 'list',
    name: 'order-list',
    component: () => import('../pages/OrderList.vue'),
  }, {
    path: 'confirm',
    name: 'order-confirm',
    component: () => import('../pages/OrderConfirm.vue'),
  }, {
    path: 'pay',
    name: 'order-pay',
    component: () => import('../pages/OrderPay.vue'),
  }]
}, {
  path: '/login',
  name: 'login',
  component: () => import('../pages/Login.vue'),
}]
const router = new VueRouter({
  routes
})
export default router