<template>
  <el-table :data="taskList" style="width: 100%">
    <el-table-column label="Рассылка">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            {{ scope.row.description }}
          </template>
          <template #reference>
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="Вид" width="80">
      <template #default="scope">
        {{ scope.row.type }}
      </template>
    </el-table-column>
    <el-table-column label="Время">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ formatTime(scope.row.time, scope.row.type) }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Статус" width="120">
      <template #default="scope">
        <el-text v-if="scope.row.active" type="success">Активна</el-text>
        <el-text v-else type="info">Неактивна</el-text>
      </template>
    </el-table-column>
    <el-table-column label="Действие" width="120">
      <template #default="scope">
        <el-button
          v-if="!scope.row.active"
          type="success"
          size="small"
          :disabled="disabledTasks.includes(scope.row.id)"
          @click="handleEdit({ ...scope.row, active: true })"
          >Запустить</el-button
        >
        <el-button
          v-else
          type="danger"
          size="small"
          :disabled="disabledTasks.includes(scope.row.id)"
          @click="handleEdit({ ...scope.row, active: false })"
          >Остановить</el-button
        >
      </template>
    </el-table-column>
    <el-table-column label="Удаление" width="120">
      <template #default="scope">
        <el-button
          type="danger"
          size="small"
          @click="handleDelete(scope.row)"
          :disabled="disabledTasks.includes(scope.row.id)"
          >Удалить</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { deleteTask, updateTask } from '@/api/api'
import type { TTask } from '@/types'
import { formatTime } from '@/utils'
import { Timer } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'

const props = defineProps<{ tasks: TTask[] }>()
const taskList = ref<TTask[]>()
const disabledTasks = ref<string[]>([])

watch(
  () => props.tasks,
  () => {
    taskList.value = props.tasks
  },
)

const handleEdit = async (task: TTask) => {
  disabledTasks.value.push(task.id)
  await updateTask(task)
  const taskIndex = taskList.value!.findIndex(({ id }) => task.id === id)
  taskList.value![taskIndex] = task
  disabledTasks.value = disabledTasks.value.filter((id) => id !== task.id)
}

const handleDelete = async (task: TTask) => {
  disabledTasks.value.push(task.id)
  await deleteTask(task)
  taskList.value = taskList.value!.filter(({ id }) => task.id !== id)
  disabledTasks.value = disabledTasks.value.filter((id) => id !== task.id)
}
</script>
