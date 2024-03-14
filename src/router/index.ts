import { createRouter, createWebHistory } from 'vue-router'
import TasksView from '../views/TasksView.vue'
import { authGuard, pathSaverGuard, querySaverGuardFactory } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: { name: 'tasks' },
    },
    {
      path: '/tasks',
      name: 'tasks',
      meta: { auth: true },
      component: TasksView,
    },
    {
      path: '/clients',
      name: 'clients',
      meta: { auth: true },
      component: () => import('../views/ClientsView.vue'),
    },
    {
      path: '/analytics',
      name: 'analytics',
      meta: { auth: true },
      component: () => import('../views/AnalyticsView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/:unknownPath(.*)',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach(authGuard)
router.beforeEach(pathSaverGuard)
router.beforeEach(querySaverGuardFactory(['segment']))

export default router
