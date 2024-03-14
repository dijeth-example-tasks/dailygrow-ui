import { type Ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const toLastItem = <T = any>(itemOrArray: T | T[]): T =>
  Array.isArray(itemOrArray) ? itemOrArray.reverse()[0] : itemOrArray

export const useQuerySync = (key: string, defaultValue: string): Ref<string> => {
  const route = useRoute()
  const router = useRouter()

  return computed({
    get(): string {
      return toLastItem(route.query[key]) || defaultValue
    },
    set(value: string) {
      const query = { ...route.query }

      if (value === defaultValue) {
        delete query[key]
      } else {
        query[key] = value
      }

      router.replace({ ...route, query })
    },
  })
}
