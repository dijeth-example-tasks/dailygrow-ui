import { type ResultContainer } from '../api/httpClient/ResultContainer'
import { useProgress } from '../plugins/progress'
import { ref } from 'vue'
import { useToaster } from '../plugins/toaster'
import { API_NATIVE_RESPONSE, type TApiFunction, type TApiReturn } from './useApi'

/**
 * Компосабл для выполнения нескольких запросов в компонентах
 * Добавляет опциональную интеграцию с прогресс баром и тостером для отображения результата
 * Возвращает реактивные переменные с результатом
 */
export function useMultiApi<T>(
  apiFunctions: TApiFunction<any>[],
  { showProgress = false, successToast = '', errorToast = '', progressKey = '' } = {},
): TApiReturn<T> {
  const result = ref<ResultContainer<T>>()
  const isLoading = ref<boolean>(false)
  const progress = useProgress()
  const progressId = progressKey || Date.now().toString()
  const toaster = useToaster()

  const startProgress = () => {
    if (progress && showProgress) {
      progress.start(progressId)
    }
  }
  const finishProgress = () => {
    if (progress && showProgress) {
      progress.finish(progressId)
    }
  }
  const failProgress = () => {
    if (progress && showProgress) {
      progress.fail()
    }
  }
  const showSuccessToast = () => {
    if (toaster && successToast) {
      toaster.success(successToast)
    }
  }
  const showErrorToast = (nativeError: string) => {
    if (toaster && errorToast) {
      toaster.error(errorToast === API_NATIVE_RESPONSE ? nativeError : errorToast)
    }
  }

  const request = async (...args: any[][]) => {
    isLoading.value = true
    result.value = undefined
    startProgress()
    const results = await Promise.all(
      apiFunctions.map((fn, i) => (args[i] ? fn(...args[i]) : fn())),
    )

    const errorResponse = results.find(({ success }) => !success)
    if (errorResponse) {
      failProgress()
      showErrorToast(errorResponse.error!.message)
      result.value = errorResponse
    } else {
      finishProgress()
      showSuccessToast()
      results[0].data = results.map(({ data }) => data)
      result.value = results[0]
    }
    isLoading.value = false

    return result.value
  }

  return {
    request,
    result,
    isLoading,
  }
}
