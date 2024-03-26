<template>
  <ElDatePicker
    type="datetime"
    v-model="innerValue"
    format="YYYY-MM-DD HH:mm"
    value-format="YYYY-M-D H:mm"
    :default-value="new Date()"
    placeholder="Выберите дату и время"
    :disabled-date="dateDisabler"
    :clearable="false"
    @change="handleDateTimeChange"
  />
</template>

<script setup lang="ts">
import { appTimezoneService } from '@/services/timezone-service'
import { computed, ref } from 'vue'

const props = defineProps<{ modelValue: number }>()
const emit = defineEmits(['update:modelValue'])
const availableTimestamp = appTimezoneService.getAppEndOfDayTimestamp(new Date(props.modelValue))

const { year, month, date } = appTimezoneService.getAppDateParams(new Date(availableTimestamp))
const innerValue = ref<string>(`${year}-${month}-${date} ${12}:${0}`)

const dateDisabler = computed(() => {
  return (time: number) => {
    return time < availableTimestamp
  }
})

const handleDateTimeChange = (date: string) => {
  emit('update:modelValue', appTimezoneService.getAppTimestamp(new Date(date)))
}
</script>

<style scoped></style>
