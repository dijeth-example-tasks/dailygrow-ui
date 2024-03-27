<template>
  <el-form
    :model="form"
    label-width="auto"
    style="max-width: 600px"
    :rules="rules"
    ref="refForm"
    status-icon
  >
    <el-form-item label="Название" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item label="Вид" prop="type">
      <el-select v-model="form.type" placeholder="Укажите частоту рассылки">
        <el-option label="Однократно" value="once" />
        <el-option label="Ежедневно" value="daily" />
        <el-option label="Еженедельно" value="weekly" />
        <el-option label="Ежемесячно" value="monthly" />
        <el-option label="Ко дню рождения" value="birthday" />
      </el-select>
    </el-form-item>

    <el-form-item :label="taskTimeLabel" prop="time">
      <time-component v-model="form.time" />
    </el-form-item>

    <el-form-item label="Текст рассылки" prop="text">
      <el-input v-model="form.text" type="textarea" />
    </el-form-item>

    <el-form-item label="Сегмент" prop="segment_id">
      <el-select v-model="form.segment_id" placeholder="Укажите сегмент">
        <el-option
          v-for="segment in segments"
          :key="segment.id"
          :label="segment.name"
          :value="segment.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="Статус" prop="active">
      <el-switch v-model="form.active" />
    </el-form-item>

    <el-form-item label="Описание" prop="description">
      <el-input v-model="form.description" type="textarea" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(refForm)">Создать</el-button>
      <el-button @click="resetForm(refForm)">Очистить</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { createTask } from '@/api/api'
import { useToaster } from '@/plugins/toaster'
import { TaskTimeLabel, type TSegment, type TSubmitTask, type TTaskType } from '@/types'
import type { FormInstance } from 'element-plus'
import { computed, reactive, ref, watch } from 'vue'
import OnesTimeInput from './task-time-inputs/OnesTimeInput.vue'
import BirthdayTimeInput from './task-time-inputs/BirthdayTimeInput.vue'
import DailyTimeInput from './task-time-inputs/DailyTimeInput.vue'
import WeeklyTimeInput from './task-time-inputs/WeeklyTimeInput.vue'
import MonthlyTimeInput from './task-time-inputs/MonthlyTimeInput.vue'

const props = defineProps<{ segments: TSegment[] }>()
const emit = defineEmits(['create'])

const refForm = ref<FormInstance>()
const toaster = useToaster()

const form = reactive<TSubmitTask>({
  name: '',
  type: 'once',
  segment_id: props.segments[0].id,
  active: true,
  text: '',
  description: '',
  time: Date.now(),
})

const rules = {
  name: [{ required: true, message: 'Заполните название рассылки', trigger: 'change' }],
  text: [{ required: true, message: 'Заполните текст СМС', trigger: 'change' }],
  type: [{ required: true, message: 'Выберите тип рассылки', trigger: 'blur' }],
  segment_id: [{ required: true, message: 'Укажите сегмент', trigger: 'blur' }],
  active: [{ required: true, message: 'Заполните поле', trigger: 'blur' }],
  time: [{ required: true, message: 'Укажите значение смещения', trigger: 'blur' }],
}

const taskTimeLabel = computed(() => TaskTimeLabel[form.type as TTaskType])
const TimeComponent = computed(() => {
  switch (form.type) {
    case 'once':
      return OnesTimeInput
    case 'daily':
      return DailyTimeInput
    case 'weekly':
      return WeeklyTimeInput
    case 'monthly':
      return MonthlyTimeInput
    default:
    case 'birthday':
      return BirthdayTimeInput
  }
})

watch(
  () => form.type,
  (value) => {
    switch (value) {
      case 'once':
        form.time = Date.now()
        break
      case 'daily':
      case 'weekly':
      case 'monthly':
        form.time = 12
        break
      default:
      case 'birthday':
        form.time = 24 + 12
        break
    }
  },
)

const prepareData = (rawTask: TSubmitTask): TSubmitTask => {
  // if (rawTask.type === 'once') {
  //   rawTask.time = Math.round((rawTask.time + Date.now()) / 1000)
  // }

  return rawTask
}

const submitForm = async (formElement: FormInstance | undefined) => {
  if (!formElement) {
    return
  }

  await formElement.validate(async (valid, fields) => {
    if (valid) {
      const task = prepareData(form)
      const response = await createTask(task)
      if (response.success) {
        emit('create', task)
        toaster.success('Рассылка успешно создана')
      } else {
        toaster.error(`Неправильно заполнены поля: ${JSON.stringify(response.response?.data)}`)
      }
    } else {
      toaster.error(`Неправильно заполнены поля: ${fields}`)
    }
  })
}

const resetForm = (formElement: FormInstance | undefined) => {
  if (!formElement) {
    return
  }
  formElement.resetFields()
}
</script>
