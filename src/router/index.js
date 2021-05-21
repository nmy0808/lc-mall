import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home.vue'
import Order from '@/views/order.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: []
  },
  {
    path: '/order',
    name: 'order',
    component: Order,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
