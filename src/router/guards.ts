import { isAuthorize } from '@/store'
import { arrayDifference } from '@/utils'
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

export const querySaverGuardFactory = (keysToSave: string[]) => {
  const keys = new Set(keysToSave)

  return (to: RouteLocationNormalized, from: RouteLocationNormalized): boolean | RouteLocation => {
    if (to.path === from.path) {
      return true
    }

    const apsentKeys = arrayDifference(Object.keys(from.query), Object.keys(to.query))
    const keysToAdd = apsentKeys.reduce<string[]>((acc, cur) => {
      return keys.has(cur) ? [...acc, cur] : acc
    }, [])

    if (!keysToAdd.length) {
      return true
    }

    const query = { ...to.query }

    keysToAdd.forEach((key) => {
      query[key] = from.query[key]
    })

    return { ...to, query }
  }
}
