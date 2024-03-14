import type { LocationQuery } from 'vue-router'
import type { TTaskType } from './types'

export const getBackPath = (query: LocationQuery): string | null => {
  const { from } = query
  if (!from) {
    return null
  }

  const value = Array.isArray(from) ? from.find(Boolean) : from

  return value || null
}

export const formatTime = (time: number, type: TTaskType): string => {
  switch (type) {
    case 'birthday':
      return `за ${Math.ceil(time / 24)} дней в ${24 - (time % 24)}:00`

    case 'once':
      return time === 0 ? 'в ближайший возможный момент' : new Date(time * 1000).toString()

    case 'daily':
      return `ежедневно в ${time}:00`

    case 'weekly':
      return `каждый ${Math.floor(time / 24)} день недели в ${time % 24}:00`

    case 'monthly':
      return `каждый ${Math.floor(time / 24)} день месяца в ${time % 24}:00`

    default:
      return ''
  }
}

export const arrayDifference = (minuend: string[], subtrahend: string[]): string[] =>
  subtrahend.length
    ? subtrahend.reduce<string[]>((acc, cur) => {
        return !minuend.includes(cur) ? [...acc, cur] : acc
      }, [])
    : [...minuend]
