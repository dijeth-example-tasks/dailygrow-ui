<template>
  <el-form
    :model="form"
    label-width="auto"
    style="max-width: 600px"
    :rules="rules"
    ref="refForm"
    status-icon
  >
    <el-form-item label="Имя" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item label="Телефон" prop="phone">
      <el-input v-model="form.phone" placeholder="+7 (123) 456 7890" :formatter="formatPhone" />
    </el-form-item>

    <el-form-item label="День рождения" prop="birthday">
      <el-date-picker
        v-model="form.birthday"
        type="date"
        placeholder="Укажите дату рождения"
        style="width: 100%"
      />
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

    <el-form-item>
      <el-button type="primary" @click="submitForm(refForm)">Создать</el-button>
      <el-button @click="resetForm(refForm)">Очистить</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { createClient } from '@/api/api'
import { useToaster } from '@/plugins/toaster'
import { type TSegment, type TSubmitClient } from '@/types'
import type { FormInstance } from 'element-plus'
import { reactive, ref } from 'vue'

const props = defineProps<{ segments: TSegment[] }>()
const emit = defineEmits(['create'])

const refForm = ref<FormInstance>()
const toaster = useToaster()

const form = reactive<TSubmitClient>({
  name: '',
  phone: '',
  birthday: '1999-01-01',
  segment_id: props.segments[0].id,
})

const phoneValidator = (rule: any, value: any, callback: any) => {
  callback(value.replace(/\D/g, '').length !== 11 ? 'Номер должен состоять из 11 цифр' : undefined)
}

const rules = {
  name: [{ required: true, message: 'Введите имя клиента', trigger: 'blur' }],
  phone: [
    { required: true, message: 'Введите телефон', trigger: 'blur' },
    { validator: phoneValidator, trigger: 'change' },
  ],
  birthday: [{ required: true, message: 'Укажите дату рождения', trigger: 'blur' }],
  segment_id: [{ required: true, message: 'Укажите сегмент', trigger: 'blur' }],
}

const formatPhone = (value: string) => {
  return value.replace(/\D/g, '').replace(/(\d)(\d\d\d)(\d\d\d)(\d\d\d\d)/, '+$1 ($2) $3 $4')
}

const formatDate = (date: string): string => {
  const [day, month, year] = new Date(date)
    .toLocaleString('en-US', { timeZone: 'Europe/Moscow' })
    .split(',')[0]
    .split('/')
  return `${year}-${month}-${day}`
}

const submitForm = async (formElement: FormInstance | undefined) => {
  if (!formElement) {
    return
  }

  await formElement.validate(async (valid, fields) => {
    if (valid) {
      const client = { ...form, birthday: formatDate(form.birthday) }
      const response = await createClient(client)
      if (response.success) {
        emit('create', form)
        toaster.success('Клиент успешно добавлен')
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
