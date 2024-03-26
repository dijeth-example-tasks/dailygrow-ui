class TimezoneService {
  private appTimezoneOffset: number
  private timeZonesDifference: number

  constructor(appTimezoneOffset: number) {
    this.appTimezoneOffset = 60 * appTimezoneOffset

    const localTimeZoneOffest = -1 * new Date().getTimezoneOffset()
    this.timeZonesDifference = this.appTimezoneOffset - localTimeZoneOffest
  }

  getAppDateParams(date: Date): {
    year: number
    month: number
    date: number
    hours: number
    minutes: number
  } {
    const cloneDate = new Date(date.getTime())
    cloneDate.setMinutes(cloneDate.getMinutes() + this.timeZonesDifference)

    return {
      year: cloneDate.getFullYear(),
      month: cloneDate.getMonth() + 1,
      date: cloneDate.getDate(),
      hours: cloneDate.getHours(),
      minutes: cloneDate.getMinutes(),
    }
  }

  getAppTimestamp(date: Date): number {
    return date.getTime() - 1000 * 60 * this.timeZonesDifference
  }

  getAppEndOfDayTimestamp(date: Date): number {
    const { hours, minutes } = this.getAppDateParams(date)
    const restMinutes = 60 - minutes
    const restHours = 24 - 1 - hours
    return date.getTime() + 1000 * 60 * (60 * restHours + restMinutes)
  }
}

export const appTimezoneService = new TimezoneService(import.meta.env.VITE_APP_TIMEZONE_OFFSET)
