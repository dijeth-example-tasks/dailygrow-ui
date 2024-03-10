import { isAuthorize } from '@/store'
import type { RouteLocation, RouteLocationNormalized } from 'vue-router'

export const authGuard = (to: RouteLocationNormalized) => {
  if (!to.meta.auth) {
    return true
  }

  if (!isAuthorize()) {
    return { name: 'login' }
  }

  return true
}

export const pathSaverGuard = (to: RouteLocationNormalized): boolean | RouteLocation => {
  if (to.name !== 'login') {
    return true
  }

  if (to.query && to.query.from) {
    return true
  }

  const { pathname } = document.location
  const path = /(register)|(login)/.test(pathname) ? '/' : pathname

  return { ...to, query: { ...to.query, from: path } }
}
