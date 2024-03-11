<template>
  <BaseLayout title="Вход">
    <LoginForm @login="handleLogin" />
  </BaseLayout>
</template>

<script setup lang="ts">
import BaseLayout from '@/components/BaseLayout.vue'
import { useToaster } from '@/plugins/toaster'
import { loginService } from '@/services/authService'
import { isAuthorize } from '@/store'
import { getBackPath } from '@/utils'
import { useRoute, useRouter } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'

const router = useRouter()
const route = useRoute()
const toaster = useToaster()

const handleLogin = async ({ email, password }: { email: string; password: string }) => {
  await loginService(email, password)

  if (isAuthorize()) {
    router.push({ path: getBackPath(route.query) || '/' })
  } else {
    toaster.error('Неверный email и/или пароль')
  }
}
</script>

<style scoped></style>
