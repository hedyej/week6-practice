import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/Product',
    component: () => import('../views/FrontHome.vue'),
    children: [
      {
        path: 'About',
        component: () => import('../views/Front/AboutView.vue')
      },
      {
        path: 'Cart',
        component: () => import('../views/Front/CartView.vue')
      },
      {
        path: 'Product',
        component: () => import('../views/Front/ProductsView.vue')
      },
      {
        path: 'Product/:id',
        component: () => import('../views/Front/ProductView.vue')
      }
    ]
  },
  {
    path: '/Admin/Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/Admin',
    redirect: '/Admin/Order',
    component: () => import('../views/AdminHome.vue'),
    children: [
      {
        path: '/Admin/Order',
        component: () => import('../views/Admin/OrderView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
