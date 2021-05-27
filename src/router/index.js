import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home.vue'
import Order from '@/views/order.vue'
import Index from '@/views/index.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: { name: 'index' },
    children: [
      {
        path: 'index',
        name: 'index',
        component: Index,
      },
      {
        path: 'detail/:id',
        name: 'detail',
        props: true,
        component: () => import('@/views/detail.vue'),
      },
      {
        path: 'product/:id',
        name: 'product',
        props: true,
        component: () => import('@/views/product.vue'),
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    component: Order,
    children: [
      {
        path: '/cart',
        name: 'order-cart',
        component: () => import('@/views/cart.vue'),
      },
      {
        path: 'confirm',
        name: 'order-confirm',
        component: () => import('@/views/orderConfirm.vue'),
      },
      {
        path: 'list',
        name: 'order-list',
        component: () => import('@/views/orderList.vue'),
      },
      {
        path: 'pay',
        name: 'order-pay',
        component: () => import('@/views/orderPay.vue'),
      }
      ,
      {
        path: 'alipay',
        name: 'alipay',
        component: () => import('@/views/alipay.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
