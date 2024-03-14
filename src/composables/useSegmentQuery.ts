import { computed, unref, type Ref } from 'vue'
import { useQuerySync } from './useQuerySync'
import type { TSegment } from '@/types'

export const useSegmentQuery = (segments: Ref<TSegment[]>) => {
  const querySegment = useQuerySync('segment', '')
  return computed({
    get: () => {
      const segmentId = parseInt(querySegment.value)

      if (Number.isNaN(segmentId)) {
        return null
      }

      if (!unref(segments).some(({ id }) => id === segmentId)) {
        return null
      }

      return segmentId
    },
    set: (value: number | null) => {
      if (value === null) {
        querySegment.value = ''
      } else {
        querySegment.value = value.toString()
      }
    },
  })
}
