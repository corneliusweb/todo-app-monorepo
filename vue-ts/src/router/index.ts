import { createRouter, createWebHistory } from 'vue-router'
import { Home, Todos, TodoDetails, TestError } from '../pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/todos',
      name: 'todos',
      component: Todos,
    },
    {
      path: '/todos/:id',
      name: 'todo-details',
      component: TodoDetails,
    },
    {
      path: '/test-error',
      name: 'test-error',
      component: TestError,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../components/NotFound.vue'),
    },
  ],
})

export default router
