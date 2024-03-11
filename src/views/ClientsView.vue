<template>
  <BaseLayout title="Клиенты">
    <SegmentList v-if="data.length" :segments="segmentData" v-model="activeSegment" />
    <ClientList :clients="clients" />
  </BaseLayout>
</template>

<script setup lang="ts">
import { getSegments } from '@/api/api'
import BaseLayout from '@/components/BaseLayout.vue'
import { useApi } from '@/composables/useApi'
import { computed, onMounted, ref, watchEffect } from 'vue'
import SegmentList from '../components/SegmentList.vue'
import ClientList from '../components/ClientList.vue'

const { request, result } = useApi(getSegments, { showProgress: true })
const data = computed(() => (result.value?.success ? result.value.data : []))
const segmentData = computed(() => data.value.map(({ id, name }) => ({ id, name })))
const activeSegment = ref()
const clients = computed(() => {
  if (null === activeSegment.value) {
    return []
  }

  const segment = data.value.find(({ id }) => id === activeSegment.value)

  return segment ? segment.clients || [] : []
})

watchEffect(() => {
  activeSegment.value = segmentData.value.length ? segmentData.value[0].id : null
})

onMounted(request)
</script>

<style scoped></style>
