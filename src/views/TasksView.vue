<template>
  <BaseLayout title="Рассылки">
    <SegmentList v-if="taskData.length" :segments="segmentData" v-model="activeSegment" />
    <TaskList :tasks="segmentTaskData" />
    <template v-if="segmentData.length">
      <h2>Добавить рассылку</h2>
      <TaskForm :segments="segmentData" @create="handleCreateTask" />
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import { getSegments, getTasks } from '@/api/api'
import BaseLayout from '@/components/BaseLayout.vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskList from '@/components/TaskList.vue'
import SegmentList from '@/components/SegmentList.vue'
import type { TSegment, TSubmitTask, TTask } from '@/types'
import { computed, onMounted } from 'vue'
import { useMultiApi } from '../composables/useMultiApi'
import { useSegmentQuery } from '@/composables/useSegmentQuery'

const { request, result } = useMultiApi<[TTask[], TSegment[]]>([getTasks, getSegments], {
  showProgress: true,
})
const taskData = computed(() => (result.value?.success ? result.value.data[0] : []))
const segmentData = computed(() => (result.value?.success ? result.value.data[1] : []))
const activeSegment = useSegmentQuery(segmentData)
const segmentTaskData = computed(() =>
  taskData.value.filter(({ segment }) => segment.id === activeSegment.value),
)
const handleCreateTask = (task: TSubmitTask) => {
  request()
  activeSegment.value = task.segment_id
}

onMounted(request)
</script>

<style scoped>
h2 {
  font-weight: 900;
  color: #252733;
  font-size: 1em;
  margin-bottom: 2em;
  margin-top: 4em;
}
</style>
