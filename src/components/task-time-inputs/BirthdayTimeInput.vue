<template>
  <span style="display: flex">
    <el-input-number
      style="width: unset"
      v-model="dayNumber"
      @change="handleControlChange"
      :min="1"
    />
    <el-time-picker
      format="HH:mm"
      value-format="HH:mm"
      v-model="time"
      @change="handleControlChange"
    />
  </span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  convertDayTimeToHours,
  convertHoursToDayTime,
  parseTimeString,
  convertToTimeString,
} from '../../utils'

const props = defineProps<{ modelValue: number }>()
const emit = defineEmits(['update:modelValue'])

const dayNumber = ref<number>(1)
const time = ref<string>('12:00')

const handleControlChange = () => {
  const { hours, minutes } = parseTimeString(time.value)
  const hoursValue = convertDayTimeToHours(
    {
      days: dayNumber.value,
      hours,
      minutes,
    },
    'before',
  )
  emit('update:modelValue', hoursValue)
}

watch(
  () => props.modelValue,
  () => {
    const { days, hours, minutes } = convertHoursToDayTime(props.modelValue, 'before')
    dayNumber.value = days
    time.value = convertToTimeString({ hours, minutes })
  },
  { immediate: true },
)
</script>

<style scoped></style>
