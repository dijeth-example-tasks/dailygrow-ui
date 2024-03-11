<template>
  <el-table :data="formattedClients" stripe style="width: 100%">
    <el-table-column prop="name" label="Имя" width="180" />
    <el-table-column prop="phone" label="Телефон" width="180" />
    <el-table-column prop="birthday" label="День рождения" />
  </el-table>
</template>

<script lang="ts" setup>
import type { TClient } from '@/types'
import { computed } from 'vue'

const props = defineProps<{ clients: TClient[] }>()
const formattedClients = computed(() =>
  props.clients.map((it) => ({
    ...it,
    phone: it.phone.replace(/7(\d\d\d)(\d\d\d)(\d\d\d\d)/, '+7 ($1) $2 $3'),
  })),
)
</script>
