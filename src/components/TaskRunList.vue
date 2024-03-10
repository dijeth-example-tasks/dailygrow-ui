<template>
  <el-table :data="formattedData" stripe style="width: 100%">
    <el-table-column prop="taskName" label="Рассылка" />
    <el-table-column prop="taskType" label="Вид" />
    <el-table-column prop="date" label="Дата запуска" />
    <el-table-column prop="allMessages" label="Всего СМС" />
    <el-table-column prop="deliveredMessages" label="Доставлено СМС" />
    <el-table-column prop="efficiency" label="Эффективность" />
  </el-table>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  taskRuns: {
    taskName: string
    date: string
    allMessages: number
    errorMessages: number
    taskType: string
  }[]
}>()

const formattedData = computed(() =>
  props.taskRuns.map(({ taskName, date, allMessages, errorMessages, taskType }) => ({
    taskName,
    taskType,
    date,
    allMessages,
    deliveredMessages: allMessages - errorMessages,
    efficiency: `${100 * (1 - errorMessages / allMessages)} %`,
  })),
)
</script>
