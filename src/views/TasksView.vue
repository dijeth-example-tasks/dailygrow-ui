<template>
  <BaseLayout title="Рассылки">
    <SegmentList v-if="data.length" :segments="segmentData" v-model="activeSegment" />
    <TaskList :tasks="data" />
  </BaseLayout>
</template>

<script setup lang="ts">
import { getTasks } from '@/api/api'
import BaseLayout from '@/components/BaseLayout.vue'
import TaskList from '@/components/TaskList.vue'
import SegmentList from '@/components/SegmentList.vue'
import { useApi } from '@/composables/useApi'
import type { TTask } from '@/types'
import { computed, onMounted, ref, watchEffect } from 'vue'

const { request, result } = useApi<TTask[]>(getTasks, { showProgress: true })
const data = computed(() => (result.value?.success ? result.value.data : []))

const segmentData = computed(() => {
  const uniqueSegments = data.value.reduce((acc, { segment }) => {
    const { id, name } = segment
    acc.set(id, { id, name })
    return acc
  }, new Map())

  return Array.from(uniqueSegments.values())
})
const activeSegment = ref()

watchEffect(() => {
  activeSegment.value = segmentData.value.length ? segmentData.value[0].id : null
})

onMounted(request)
</script>

<style scoped></style>
