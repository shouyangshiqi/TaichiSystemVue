import { createRouter, createWebHistory } from 'vue-router'

// 需要定义 routes 数组
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')  // 确保文件名正确
  },
  {
    path: '/register',
    name: 'Register', 
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/exhibition',
    name: 'Exhibition',
    component: () => import('@/views/ExhibitionHall.vue')
  },
  {
    path: '/',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && to.path !== '/register' && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router