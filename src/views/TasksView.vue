<template>
  <BaseLayout title="Рассылки">
    <SegmentList v-if="taskData.length" :segments="segmentData" v-model="activeSegment" />
    <TaskList :tasks="segmentTaskData" />
  </BaseLayout>
</template>

<script setup lang="ts">
import { getSegments, getTasks } from '@/api/api'
import BaseLayout from '@/components/BaseLayout.vue'
import TaskList from '@/components/TaskList.vue'
import SegmentList from '@/components/SegmentList.vue'
import type { TSegment, TTask } from '@/types'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useMultiApi } from '../composables/useMultiApi'

const { request, result } = useMultiApi<[TTask[], TSegment[]]>([getTasks, getSegments], {
  showProgress: true,
})
const activeSegment = ref()
const taskData = computed(() => (result.value?.success ? result.value.data[0] : []))
const segmentData = computed(() => (result.value?.success ? result.value.data[1] : []))
const segmentTaskData = computed(() =>
  taskData.value.filter(({ segment }) => segment.id === activeSegment.value),
)

watchEffect(() => {
  activeSegment.value = segmentData.value.length ? segmentData.value[0].id : null
})

onMounted(request)
</script>

<style scoped></style>
