import type { AxiosResponse } from 'axios'

export type ResultError = {
  statusCode: number
  message: string
}

export type SuccessResultContainer<T = any> = {
  success: true
  data: T
  error: null
  response: AxiosResponse<T>
}

export type ErrorResultContainer<T = any> = {
  success: false
  data: null
  error: ResultError
  response: AxiosResponse<T> | null
}

export type ResultContainer<T> = SuccessResultContainer<T> | ErrorResultContainer<T>

export const createSuccessResult = <T = any>(
  result: T,
  response: AxiosResponse<T>
): SuccessResultContainer<T> => ({
  success: true,
  data: result,
  error: null,
  response
})

export const createErrorResult = <T = any>(
  error: ResultError,
  response?: AxiosResponse<T>
): ErrorResultContainer => ({
  success: false,
  data: null,
  error,
  response: response || null
})
