<template>
  <el-dropdown class="segment-list" @command="handleCommand">
    <span class="el-dropdown-link">
      {{ selectedItem?.name }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="segment in segments" :command="segment.id" :key="segment.id">{{
          segment.name
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import type { TSegment } from '@/types'
import { ArrowDown } from '@element-plus/icons-vue'
import { computed } from 'vue'

const props = defineProps<{ segments: TSegment[]; modelValue: string }>()
const emit = defineEmits(['update:modelValue'])

const handleCommand = (command: string | number | object) => {
  emit('update:modelValue', command)
}

const selectedItem = computed(() => props.segments.find(({ id }) => props.modelValue === id))
</script>

<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.segment-list {
  margin-bottom: 1em;
}
</style>
