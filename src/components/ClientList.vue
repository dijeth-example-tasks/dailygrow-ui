<template>
  <el-table :data="clientList" stripe style="width: 100%">
    <el-table-column prop="name" label="Имя" />
    <el-table-column prop="phone" label="Телефон" />
    <el-table-column prop="birthday" label="День рождения" />
    <el-table-column label="Удаление" width="120">
      <template #default="scope">
        <el-button
          type="danger"
          size="small"
          @click="handleDelete(scope.row)"
          :disabled="disabledClients.includes(scope.row.id)"
          >Удалить</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { deleteClient } from '@/api/api'
import type { TClient } from '@/types'
import { ref, watch } from 'vue'

const props = defineProps<{ clients: TClient[] }>()
const disabledClients = ref<string[]>([])
const clientList = ref<TClient[]>([])

watch(
  () => props.clients,
  () => {
    clientList.value = props.clients.map((it) => ({
      ...it,
      phone: it.phone.replace(/\d(\d\d\d)(\d\d\d)(\d\d\d\d)/, '+7 ($1) $2 $3'),
    }))
  },
)

const handleDelete = async (client: TClient) => {
  disabledClients.value.push(client.id)
  await deleteClient(client)
  clientList.value = clientList.value!.filter(({ id }) => client.id !== id)
  disabledClients.value = disabledClients.value.filter((id) => id !== client.id)
}
</script>
