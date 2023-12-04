import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/LoginPage.vue')
    },
    {
      path: '/',
      name: 'Layout',
      redirect: '/article/manage',
      component: () => import('@/views/Layout/LayoutContainer.vue'),
      children: [
        {
          path: '/article/manage',
          name: 'ArticleManage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          name: 'ArticleChannel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          name: 'UserProfile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          name: 'UserAvatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          name: 'UserPassword',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})
// 添加路由守卫
const whiteList = ['/login']
router.beforeEach((to, from) => {
  const userStore = useUserStore()
  if (!whiteList.includes(to.path) && !userStore.token) {
    return '/login'
  }
})
export default router
