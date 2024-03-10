import type { LocationQuery } from 'vue-router'

export const getBackPath = (query: LocationQuery): string | null => {
  const { from } = query
  if (!from) {
    return null
  }

  const value = Array.isArray(from) ? from.find(Boolean) : from

  return value || null
}
