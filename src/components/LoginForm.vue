<template>
  <el-form
    ref="formRef"
    style="max-width: 600px"
    :model="form"
    :rules="rules"
    label-width="auto"
    status-icon
  >
    <el-form-item label="E-mail" prop="email">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input type="password" v-model="form.password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)"> Вход </el-button>
      <el-button type="success" @click="handleDemoLogin"> Войти как Demo-user </el-button>
      <el-button @click="resetForm(formRef)">Очистить</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface RuleForm {
  email: string
  password: string
}

const emit = defineEmits(['login'])

const formRef = ref<FormInstance>()
const form = reactive<RuleForm>({
  email: '',
  password: '',
})

const rules = reactive<FormRules<RuleForm>>({
  email: [{ required: true, message: 'Введите E-Mail', trigger: 'blur' }],
  password: [
    {
      required: true,
      message: 'Введите пароль',
      trigger: 'change',
    },

    { min: 8, message: 'Длина не менее 8 символов', trigger: 'blur' },
  ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      emit('login', { email: form.email, password: form.password })
    }
  })
}

const handleDemoLogin = () => {
  form.email = 'demo-user@email.com'
  form.password = 'demo-user'

  submitForm(formRef.value)
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
