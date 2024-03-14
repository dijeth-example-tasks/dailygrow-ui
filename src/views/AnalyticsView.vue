<template>
  <BaseLayout title="Аналитика">
    <SegmentList :segments="segmentData" v-model="activeSegment" />
    <TaskRunList :task-runs="taskRuns" />
  </BaseLayout>
</template>

<script setup lang="ts">
import { getSegments, getTaskRuns } from '@/api/api'
import BaseLayout from '@/components/BaseLayout.vue'
import TaskRunList from '@/components/TaskRunList.vue'
import SegmentList from '@/components/SegmentList.vue'
import type { TSegment, TTaskRun } from '@/types'
import { computed, onMounted } from 'vue'
import { useSegmentQuery } from '@/composables/useSegmentQuery'
import { useMultiApi } from '@/composables/useMultiApi'

const { request, result } = useMultiApi<[TTaskRun[], TSegment[]]>([getTaskRuns, getSegments], {
  showProgress: true,
})

const taskRunData = computed(() => (result.value?.success ? result.value.data[0] : []))
const segmentData = computed(() => (result.value?.success ? result.value.data[1] : []))
const activeSegment = useSegmentQuery(segmentData)

const taskRuns = computed(() => {
  if (null === activeSegment.value) {
    return []
  }

  const taskRuns = taskRunData.value.filter(({ task }) => task!.segment.id === activeSegment.value)

  return taskRuns.map(({ task, date, messages_count, errors_count }) => ({
    taskName: task!.name,
    taskType: task!.type,
    date,
    allMessages: messages_count,
    errorMessages: errors_count,
  }))
})

onMounted(request)
</script>

<style scoped></style>
