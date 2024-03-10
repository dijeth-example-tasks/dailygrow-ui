<template>
  <BaseLayout title="Вход">
    <form @submit.prevent="handleSubmit">
      <input type="email" v-model="email" />
      <input type="password" v-model="password" />
      <button type="submit">Login</button>
    </form>
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue'
import { useToaster } from '@/plugins/toaster'
import { loginService } from '@/services/authService'
import { isAuthorize } from '@/store'
import { getBackPath } from '@/utils'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const email = ref<string>('d.orlov777@gmail.com')
const password = ref<string>('1enn0quE')
const router = useRouter()
const route = useRoute()
const toaster = useToaster()

const handleSubmit = async () => {
  await loginService(email.value, password.value)

  if (isAuthorize()) {
    router.push({ path: getBackPath(route.query) || '/' })
  } else {
    toaster.error('Неверный email и/или пароль')
  }
}
</script>

<style scoped></style>
