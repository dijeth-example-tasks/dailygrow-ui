<template>
  <BaseLayout title="Клиенты">
    <SegmentList v-if="segmentData.length" :segments="segmentData" v-model="activeSegment" />
    <ClientList :clients="clients" />
    <template v-if="segmentData.length">
      <h2>Добавить клиента</h2>
      <ClientForm :segments="segmentData" @create="handleCreateTask" />
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import { getSegments } from '@/api/api'
import BaseLayout from '@/components/BaseLayout.vue'
import { useApi } from '@/composables/useApi'
import { computed, onMounted, ref, watch } from 'vue'
import SegmentList from '../components/SegmentList.vue'
import ClientList from '../components/ClientList.vue'
import ClientForm from '../components/ClientForm.vue'
import type { TSubmitClient } from '@/types'

const { request, result } = useApi(getSegments, { showProgress: true })
const segmentData = computed(() => (result.value?.success ? result.value.data : []))
const activeSegment = ref<null | number>(null)
const clients = computed(() => {
  if (null === activeSegment.value) {
    return []
  }
  const segment = segmentData.value.find(({ id }) => id === activeSegment.value)
  return segment ? segment.clients || [] : []
})

const handleCreateTask = (client: TSubmitClient) => {
  request()
  activeSegment.value = client.segment_id
}

watch(segmentData, () => {
  if (null !== activeSegment.value) {
    return
  }

  activeSegment.value = segmentData.value.length ? segmentData.value[0].id : null
})

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
