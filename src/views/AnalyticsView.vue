<template>
  <BaseLayout title="Аналитика">
    <SegmentList :segments="segmentData" v-model="activeSegment" />
    <TaskRunList :task-runs="taskRuns" />
  </BaseLayout>
</template>

<script setup lang="ts">
import { getTaskRuns } from '@/api/api'
import BaseLayout from '@/components/BaseLayout.vue'
import TaskRunList from '@/components/TaskRunList.vue'
import SegmentList from '@/components/SegmentList.vue'
import { useApi } from '@/composables/useApi'
import type { TTaskRun } from '@/types'
import { computed, onMounted, ref, watchEffect } from 'vue'

const { request, result } = useApi<TTaskRun[]>(getTaskRuns, { showProgress: true })

const data = computed(() => (result.value?.success ? result.value.data : []))
const segmentData = computed(() => {
  const uniqueSegments = data.value.reduce((acc, { task }) => {
    acc.set(task!.segment.id, task!.segment)
    return acc
  }, new Map())

  return Array.from(uniqueSegments.values())
})

const activeSegment = ref()

const taskRuns = computed(() => {
  if (null === activeSegment.value) {
    return []
  }

  const taskRuns = data.value.filter(({ task }) => task!.segment.id === activeSegment.value)

  return taskRuns.map(({ task, date, messages_count, errors_count }) => ({
    taskName: task!.name,
    taskType: task!.type,
    date,
    allMessages: messages_count,
    errorMessages: errors_count,
  }))
})

watchEffect(() => {
  activeSegment.value = segmentData.value.length ? segmentData.value[0].id : null
})

onMounted(request)
</script>

<style scoped></style>
