import { createRouter, createWebHashHistory } from 'vue-router'

const CustomPlatform = () => import('@/views/CustomPlatform.vue')
const NotFound = () => import('@/components/NotFound.vue')

const routes = [
  { path: '/', component: CustomPlatform },
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth',
        }
      }

      return { top: 0 }
    }
  }
})

export { router }