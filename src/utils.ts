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

export type DayTimeParam = { days: number; hours: number; minutes: number }
// Определяет отношение события и времени. "after" - указанное время отсчитывается после события, "before" - до
export type TimeDirection = 'before' | 'after'

export const convertHoursToDayTime = (hours: number, direction: TimeDirection): DayTimeParam => {
  const hoursValue = hours % 24
  const days = 1 + (hours - hoursValue) / 24
  const minutesValue = direction === 'after' ? hoursValue * 60 : (24 - hoursValue) * 60
  const minutes = minutesValue % 60

  return {
    days,
    hours: (minutesValue - minutes) / 60,
    minutes,
  }
}

export const convertDayTimeToHours = (
  { days, hours, minutes }: DayTimeParam,
  direction: TimeDirection,
): number => {
  const minutesValue =
    direction === 'after' ? minutes + 60 * hours : 24 * 60 - (minutes + 60 * hours)

  return (days - 1) * 24 + minutesValue / 60
}

export const parseTimeString = (time: string): Omit<DayTimeParam, 'days'> => {
  const [hours, minutes] = time.split(':').map((it) => parseInt(it, 10))
  return { hours, minutes }
}

export const convertToTimeString = ({ hours, minutes }: Omit<DayTimeParam, 'days'>): string => {
  const hoursString = hours >= 10 ? hours.toString() : `0${hours.toString()}`
  const minutesString = minutes >= 10 ? minutes.toString() : `0${minutes.toString()}`
  return `${hoursString}:${minutesString}`
}
