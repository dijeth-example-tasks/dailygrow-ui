<template>
  <el-dropdown class="segment-list" @command="handleCommand">
    <el-button class="segment-list__button">
      <span class="el-dropdown-link">
        {{ selectedItem?.name }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
    </el-button>
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

const props = defineProps<{ segments: TSegment[]; modelValue: number | null }>()
const emit = defineEmits(['update:modelValue'])

const handleCommand = (command: string | number | object) => {
  emit('update:modelValue', command)
}

const selectedItem = computed(() => {
  if (props.modelValue === null) {
    return props.segments[0]
  }

  return props.segments.find(({ id }) => props.modelValue === id)
})
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

.el-dropdown-link {
  min-width: 200px;
  display: flex;
  justify-content: space-between;
}

.el-dropdown-menu {
  min-width: 200px;
}
</style>
