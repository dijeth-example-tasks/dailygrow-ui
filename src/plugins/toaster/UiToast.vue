<template>
  <div class="toast" :class="data.className">
    <component class="toast__icon" :is="data.icon" />
    <span>{{ text }}</span>
  </div>
</template>

<script lang="ts">
export const ToastKind = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
} as const

export type TToastKind = (typeof ToastKind)[keyof typeof ToastKind]
</script>

<script lang="ts" setup>
import { computed, onMounted, type Component } from 'vue'
import IconAlert from '@/components/icons/IconAlert.vue'
import IconCheck from '@/components/icons/IconCheck.vue'

type TToastData = {
  icon: Component
  className: string
}

const props = withDefaults(
  defineProps<{
    text: string
    kind?: TToastKind
    timeout?: number
  }>(),
  {
    kind: ToastKind.SUCCESS,
    timeout: 5000,
  },
)

const emit = defineEmits(['close'])

const data = computed<TToastData>(() => {
  switch (props.kind) {
    case ToastKind.ERROR:
      return {
        icon: IconAlert,
        className: 'toast_error',
      }

    default:
    case ToastKind.SUCCESS:
      return {
        icon: IconCheck,
        className: 'toast_success',
      }
  }
})

onMounted(() => {
  setTimeout(() => {
    emit('close')
  }, props.timeout)
})
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
