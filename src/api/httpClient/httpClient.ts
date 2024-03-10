import axios from 'axios'
import { createErrorResult, createSuccessResult } from './ResultContainer'

type TNetworkErrorHandler = () => Promise<void>

let _onNetworkError: TNetworkErrorHandler
let _onAuthenticatedHandler: TNetworkErrorHandler

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
  validateStatus(status) {
    /*
      401 Unauthenticated
      405 Method Not Allowed
      408 Request Timeout
      429 Too Many Requests
     */
    return ![401, 405, 408, 429].includes(status) && status < 500
  }
})

httpClient.interceptors.response.use(
  (response) => {
    // Превращаем результат в контейнер результата
    if (response.status >= 400) {
      return createErrorResult(
        {
          statusCode: response.status,
          message: response.data.message ?? response.data ?? response.statusText
        },
        response
      )
    } else {
      return createSuccessResult(response.data, response)
    }
  },
  (error) => {
    if ((!error.response || error.code === 'ECONNABORTED') && _onNetworkError) {
      _onNetworkError()
      return createErrorResult(error)
    }

    if (error.response.status === 401 && _onAuthenticatedHandler) {
      _onAuthenticatedHandler()
      return createErrorResult(error, error.response)
    }

    throw new Error(error)
  }
)

// Добавляем возможность устанавливать обработчики некоторых ошибок API
export const onUnauthenticated = (handler: TNetworkErrorHandler) => {
  _onAuthenticatedHandler = handler
}

export const onNetworkError = (handler: TNetworkErrorHandler) => {
  _onNetworkError = handler
}
